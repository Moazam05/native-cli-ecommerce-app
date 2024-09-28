import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CartTwo, leftArrow} from '../../assets/images';
import {Colors} from '../../constants/colors';
import {featuredProducts, imagesData} from '../../constants/index';
import Swiper from 'react-native-swiper';

const ProductDetail = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const route = useRoute();
  const {item} = route.params;

  const [selectedProduct, setSelectedProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const product = featuredProducts.find(pr => pr.linkId === item.linkId);
    setSelectedProduct(product);

    const findImages = imagesData.find(pr => pr.linkId === item.linkId);
    if (findImages) {
      setProductImages(findImages.images); // Set the actual images array
    }
  }, [item]);

  console.log('productImages', productImages);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.PRIMARY_BG}
      />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <TouchableOpacity>
            <Image source={CartTwo} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imgWrap}>
        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={index => setActiveIndex(index)}
          showsPagination={false}>
          {productImages.map((image, index) => (
            <View key={index} style={styles.banner}>
              <Image source={image} style={styles.bannerImg} />
            </View>
          ))}
        </Swiper>

        <View style={styles.pagination}>
          {productImages.map((_, index) => (
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
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  cartIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  imgWrap: {
    height: 275,
    justifyContent: 'center',
    width: '100%',
  },
  banner: {
    marginHorizontal: 16,
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    borderRadius: 12,
    width: '100%',
    height: 215,
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#F83758',
  },
  inactiveDot: {
    backgroundColor: '#DEDBDB',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
