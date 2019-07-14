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


//     spyOn(console, 'log');

//     printReceipt(tags);

//     const expectText = `***<没钱赚商店>收据***
// 名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
// 名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
// 名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
// ----------------------
// 总计：58.50(元)
// 节省：7.50(元)
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
  expect( getDetailBarcodesInfo(tags)).toEqual([{barcode: "ITEM000001",number: 5,unitPrice: 3},{barcode: "ITEM000003",number: 2.5,unitPrice: 15},{barcode: "ITEM000005",number: 3,unitPrice: 4.5}]);
})
it('return "The barcodes are wrong!" when call getDetailBarcodesInfo given wrong barcodes', () => {
  expect( getDetailBarcodesInfo(tags1)).toBe("The barcodes are wrong!");
})

});
