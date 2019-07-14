'use strict';

describe('pos', () => {

//   it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const tags1 = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000010'
    ];
const detailBarcodesInfo=getDetailBarcodesInfo(tags);
const receiptInformation=calculateSubtotal(getDetailBarcodesInfo(tags));
const sumOfSubtotal=calculateSumOfSubtotal(receiptInformation);
const totalPromotionPrice=getTotalPromotionPrice(receiptInformation);
const receipt=`***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3(元)，小计：9(元)
名称：荔枝，数量：2.5斤，单价：15(元)，小计：37.5(元)
名称：方便面，数量：3袋，单价：4.5(元)，小计：9(元)
----------------------
总计：55.5(元)
节省：10.5(元)
**********************`;

//     spyOn(console, 'log');

//     printReceipt(tags);

//     const expectText = `***<没钱赚商店>收据***
// 名称：雪碧，数量：5瓶，单价：3(元)，小计：9(元)
// 名称：荔枝，数量：2.5斤，单价：15(元)，小计：37.5(元)
// 名称：方便面，数量：3袋，单价：4.5(元)，小计：9(元)
// ----------------------
// 总计：55.5(元)
// 节省：10.5(元)
// **********************`;

//     expect(console.log).toHaveBeenCalledWith(expectText);
//   });

it('return true when all elements in barcodes are right', () => {
  expect(isBarcodesValid(tags)).toBe(true);
})
it('return false when some elements in barcodes are wrong', () => {
  expect(isBarcodesValid(tags1)).toBe(false);
})

it('return detailBarcodesInfo when  call getDetailBarcodesInfo given barcodes', () => {
  expect( getDetailBarcodesInfo(tags)).toEqual([{barcode: "ITEM000001",name: "雪碧",unit: "瓶",number: 5,unitPrice: 3},{barcode: "ITEM000003",name: "荔枝",unit: "斤",number: 2.5,unitPrice: 15},{barcode: "ITEM000005",name: "方便面",unit: "袋",number: 3,unitPrice: 4.5}]);
})
it('return "The barcodes are wrong!" when call getDetailBarcodesInfo given wrong barcodes', () => {
  expect( getDetailBarcodesInfo(tags1)).toBe("The barcodes are wrong!");
})

it('return receiptInformation when call calculateSubtotal given detailBarcodesInfo', () => {
  expect( calculateSubtotal(detailBarcodesInfo)).toEqual([{barcode: "ITEM000001",name: "雪碧",unit: "瓶",number: 5,unitPrice: 3,subtotal: 9},{barcode: "ITEM000003",name: "荔枝",unit: "斤",number: 2.5,unitPrice: 15,subtotal: 37.5},{barcode: "ITEM000005",name: "方便面",unit: "袋",number: 3,unitPrice: 4.5,subtotal: 9}]);
})

it('return sumOfSubtotal when call calculateSumOfSubtotal given receiptInformation', () => {
  expect( calculateSumOfSubtotal(receiptInformation)).toEqual(55.5);
})

it('return totalPromotionPrice when call getTotalPromotionPrice given receiptInformation', () => {
  expect( getTotalPromotionPrice(receiptInformation)).toEqual(10.5);
})

it('return receipt when call printReceipt given receiptInformation,sumOfSubtotal and totalPromotionPrice', () => {
  expect( printReceipt(receiptInformation,sumOfSubtotal,totalPromotionPrice)).toBe(receipt);
})


});
