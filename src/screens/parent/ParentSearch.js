import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { themeColors } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import TeacherStarRating from '../components/TeacherStarRating';

const ParentSearch = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchResultFound, setSearchResultFound] = useState(true); // State to track search result status
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [clearFields, setClearFields] = useState(true);
  const isFocused = useIsFocused();

  const handleFilter = async (filterType) => {
    setSelectedFilter(filterType);
    setShowFilterModal(false);
    setSearchQuery(''); // Clear search query when filter changes
    setFilteredData([]); // Clear filtered data when filter changes
  };

  useFocusEffect(
    React.useCallback(() => {
      if (clearFields) {
        setSearchQuery('');
        setFilteredData([]);
      }
      setClearFields(true); // Reset the flag after handling field clearing

      return () => {
        setClearFields(true);
      };
    }, [clearFields])
  );

  const handleSearch = async () => {
    try {
      let querySnapshot;
      if (!searchQuery) {
        querySnapshot = await firestore()
          .collection('Teachers')
          .get();
      } else if (searchQuery) {



        if (selectedFilter === 'teacher') {
          querySnapshot = await firestore()
            .collection('Teachers')
            .where('name', '>=', searchQuery)
            .where('name', '<=', searchQuery + '\uf8ff')
            .get();
        } else {
          querySnapshot = await firestore()
            .collection('Teachers')
            .where('majorSubject', '>=', searchQuery)
            .where('majorSubject', '<=', searchQuery + '\uf8ff')
            .get();
        }
      }

      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (selectedFilter !== 'teacher' && docData.Status !== 'approved') {
          return;
        }
        data.push({ id: doc.id, ...docData });
      });

      data.sort((a, b) => b.rating - a.rating);

      setFilteredData(data);
      setSearchResultFound(data.length > 0);
    } catch (error) {
      console.error('Error searching data: ', error);
    }
  };


  const viewDetails = (item) => {
    setClearFields(false);

    navigation.navigate('TeacherSearchs', { teacher: item });

  };

  const renderFilteredData = () => {
    return (
      <View>
        {filteredData.map((item, index) => (

          <View key={item.id} style={[styles.reqpart]}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.circle}>
                <Image source={{ uri: item.ImageURL }} style={styles.selectedImage} />
              </View>

              <View style={{ marginTop: hp(-2) }}>
                <View style={{ flexDirection: 'row', width: wp(49) }}>
                  <Text style={styles.text2}>{item.name}</Text>

                </View>
                {selectedFilter === 'student' ? (
                  <Text style={styles.text}>Class =&gt; {item.qualification}</Text>
                ) : (
                  <Text style={styles.text}>{item.qualification}</Text>

                )}

              </View>
              <TouchableOpacity onPress={() => viewDetails(item)}>
                <View style={[styles.btn]}>
                  <Text style={{ color: 'black', textAlign: 'center' }}>Details</Text>
                </View>
              </TouchableOpacity>
              {
                selectedFilter === 'student' || selectedFilter === 'Subject' ? (null) : (
                  <View style={styles.ratingContainer}>
                    <TeacherStarRating teacherEmail={item.email} />
                  </View>
                )
              }

            </View>

          </View>
        ))}
      </View>
    );
  };


  return (
    <View>
      <View style={styles.center}>
        <TextInput
          style={styles.searchbox}
          placeholderTextColor={'gray'}

          placeholder={`Search by ${selectedFilter ? selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) : 'Subject'}`}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity onPress={() => handleSearch()}>
          <FontAwesome name="search" size={19} color="#191D88" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <FontAwesome name="filter" size={22} color="#FFCD4B" style={{ marginLeft: wp(3) }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: hp(4), }}></View>
      {filteredData.length > 0 ? (
        renderFilteredData()
      ) : (
        <Text style={styles.noRecordText}></Text>
      )}

      {!searchResultFound && (
        <Text style={styles.noRecordText}>𝙎𝙤𝙧𝙧𝙮, 𝙉𝙤 𝙍𝙚𝙘𝙤𝙧𝙙 𝙁𝙤𝙪𝙣𝙙</Text>
      )}

      {/* Modal for filter options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <TouchableOpacity onPress={() => handleFilter('teacher')}>
              <Text style={styles.filterOption}>𝓣𝓮𝓪𝓬𝓱𝓮𝓻</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilter('subject')}>
              <Text style={styles.filterOption}>𝓢𝓾𝓫𝓳𝓮𝓬𝓽</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Text style={styles.cancelText}>𝐂𝐚𝐧𝐜𝐞𝐥</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbox: {
    height: hp(6),
    width: wp(65),
    marginLeft: wp(5),
    backgroundColor: 'white',
    color: 'black',
  },
  noRecordText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  reqpart: {
    backgroundColor: "white",
    borderRadius: 9,

    height: hp(14),
    paddingLeft: wp(2),

    marginHorizontal: wp(3),
    marginVertical: hp(1),
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 8,
  }, circle:
  {
    backgroundColor: 'white',
    height: hp(10),
    width: wp(20),
    borderRadius: 100,

    marginTop: hp(2),

    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  }, selectedImage: {
    backgroundColor: 'white',
    height: hp(10),
    width: wp(20),
    borderRadius: 100,
    borderWidth: hp(0.3),
    borderStyle: 'solid',
    borderColor: themeColors.bg3,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  text:
  {
    color: themeColors.bg2,
    marginLeft: wp(4),
    // marginTop:hp(-1),
  },
  text2:
  {
    color: themeColors.bg3,
    fontSize: 17,
    fontWeight: '600',
    marginLeft: wp(4),
    marginTop: hp(4),
  },
  center: {
    height: hp(7),
    width: wp(85),
    backgroundColor: 'white',
    marginTop: hp(8),
    marginLeft: wp(8),
    alignItems: 'center',
    marginBottom: hp(-0.5),
    flexDirection: 'row',
    borderRadius: wp(3),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  btn: {
    marginTop: hp(5.3),
    color: 'black',
    backgroundColor: themeColors.bg2,
    borderRadius: 4,
    padding: hp(0.7),
    width: wp(17),



  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: wp(80),
  },
  filterOption: {
    fontSize: 28,
    paddingVertical: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color: '#191D88'
  },
  cancelText: {
    fontSize: 28,
    paddingVertical: 10,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginLeft: wp(-62),
    marginTop: hp(8.3)
  }
});

export default ParentSearch;
