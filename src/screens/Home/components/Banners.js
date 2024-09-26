import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Banner1, RightArrow} from '../../../assets/images';
import {Colors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import Swiper from 'react-native-swiper';
import {bannersData} from '../../../constants';

const Banners = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <View style={styles.swiperContainer}>
        <Swiper
          autoplay
          autoplayTimeout={5}
          showsPagination={false}
          onIndexChanged={index => setActiveIndex(index)}>
          {bannersData.map(banner => (
            <View key={banner.id} style={styles.banner}>
              <View style={styles.bannerImg}>
                <banner.image />
                <View style={styles.textContainer}>
                  <Text style={styles.discountText}>{banner.textOne}</Text>
                  <Text style={styles.productText}>{banner.textTwo}</Text>
                  <Text style={styles.colorText}>All colors</Text>
                  <TouchableOpacity style={styles.shopNowBtn}>
                    <Text style={styles.shopNowText}>{banner.buttonText}</Text>
                    <View style={styles.rightArrow}>
                      <RightArrow />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Swiper>

        <View style={styles.pagination}>
          {bannersData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
      <View>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          eligendi cumque, ex accusamus dolorum obcaecati fugiat iusto sit ea
          earum, iure itaque quas tenetur laudantium, facere optio asperiores
          natus ipsum.
        </Text>
      </View>
    </>
  );
};

export default Banners;

const styles = StyleSheet.create({
  swiperContainer: {
    height: 260,
    justifyContent: 'center',
  },
  banner: {
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: 25,
  },
  discountText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  productText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginTop: 5,
    marginBottom: 5,
  },
  colorText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginBottom: 5,
  },
  shopNowBtn: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  shopNowText: {
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 12,
  },
  rightArrow: {
    marginTop: 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFA3B3',
  },
  inactiveDot: {
    backgroundColor: '#DEDBDB',
  },
});
