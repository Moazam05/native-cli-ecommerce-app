import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {FillStar, HalfStar, Next} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';
import {discountedProducts} from '../../../constants';

const DiscountedProducts = () => {
  const flatListRef = useRef(null);
  const productsPerPage = 2; // Show 2 products at a time
  let currentIndex = 0;

  const formatPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thousand separator
  };

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const isHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FillStar key={i} />);
    }

    // Add half star if necessary
    if (isHalfStar) {
      stars.push(<HalfStar key="half" />);
    }

    return stars;
  };

  const handleNextPress = () => {
    if (flatListRef.current) {
      currentIndex += productsPerPage;
      if (currentIndex >= discountedProducts.length) {
        currentIndex = 0; // Reset to the beginning if end is reached
      }
      flatListRef.current.scrollToIndex({index: currentIndex});
    }
  };

  const renderProduct = ({item}) => (
    <View style={styles.productWrap}>
      <View style={styles.image}>
        <item.image width="100%" height="100" />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>PKR {formatPrice(item.price)}</Text>

        <View style={styles.priceWrap}>
          <Text style={styles.oldPrice}>PKR {formatPrice(item.oldPrice)}</Text>
          <Text style={styles.off}>{item.off}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.wrap}>
      <FlatList
        ref={flatListRef}
        data={discountedProducts}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProduct}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      />

      {/* Next button to show next set of products */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Next />
      </TouchableOpacity>
    </View>
  );
};

export default DiscountedProducts;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productWrap: {
    backgroundColor: Colors.WHITE,
    width: 140,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
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
});
