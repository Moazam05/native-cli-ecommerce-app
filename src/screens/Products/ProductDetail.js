import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {featuredProducts} from '../../constants/index';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    const product = featuredProducts.find(pr => pr.linkId === item.linkId);
    setSelectedProduct(product);
  }, [item]);

  console.log('selectedProduct', selectedProduct);

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

      <View>
        <Image source={selectedProduct?.image} style={styles.productImage} />
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
  productImage: {
    width: '100%',
    height: 215,
    resizeMode: 'contain',
  },
});
