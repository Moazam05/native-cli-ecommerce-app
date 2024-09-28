import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CartTwo, leftArrow} from '../../assets/images';
import {Colors} from '../../constants/colors';
import {featuredProducts, imagesData} from '../../constants/index';
import Swiper from 'react-native-swiper';
import {Fonts} from '../../constants/fonts';
import {renderStars, thousandSeparator} from '../../utils';

const ProductDetail = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const route = useRoute();
  const {item} = route.params;

  const [selectedProduct, setSelectedProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productSize, setProductSize] = useState('');

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
      {/* Swiper */}
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

      {/* Product Info */}
      <View style={styles.productInfo}>
        <View style={styles.sizeWrap}>
          <Text style={styles.sizeTitle}>Size:</Text>
          <Text style={styles.sizeTitle}>{productSize}</Text>
        </View>
        <View style={styles.chipWrap}>
          {selectedProduct?.productSize.map((size, index) => {
            return (
              <Text
                key={index}
                style={[
                  styles.chip,
                  productSize === size.size ? styles.activeChip : null,
                ]}
                onPress={() => setProductSize(size.size)}>
                {size?.size}
              </Text>
            );
          })}
        </View>

        <Text style={styles.title}>{selectedProduct.name}</Text>
        <Text style={styles.price}>
          PKR {thousandSeparator(selectedProduct?.price)}
        </Text>

        <View style={styles.priceWrap}>
          <Text style={styles.oldPrice}>
            PKR {thousandSeparator(selectedProduct?.oldPrice)}
          </Text>
          <Text style={styles.off}>{selectedProduct?.off}</Text>
        </View>

        <View style={styles.starWrap}>
          <Text>{renderStars(selectedProduct?.rating)}</Text>
          <Text style={styles.count}>({selectedProduct?.ratingCount})</Text>
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
  productInfo: {
    marginHorizontal: 16,
  },
  sizeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sizeTitle: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 4,
    color: '#FA7189',
    fontFamily: Fonts.SEMIBOLD,
    borderColor: '#FA7189',
    borderWidth: 1,
    fontSize: 14,
  },
  activeChip: {
    backgroundColor: '#FA7189',
    color: Colors.WHITE,
  },
  prName: {
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: '#BBBBBB',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.LIGHT,
  },
  off: {
    fontSize: 10,
    color: '#FE735C',
    marginLeft: 4,
    fontFamily: Fonts.REGULAR,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  count: {
    fontSize: 10,
    color: '#A4A9B3',
    fontFamily: Fonts.REGULAR,
  },
});
