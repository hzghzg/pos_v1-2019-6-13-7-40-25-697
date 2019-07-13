'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
const isBarcodesValid=(barcodes)=>{//传进来的实际是tags
    const itemList=loadAllItems();
    let barcodeInItemList=itemList.map(item=>item.barcode);
    let newBarcodes=barcodes.map(item=>item.length<=10?item:item.substring(0,10));
    let sameElementInBarcodesAndInBarcodeInItemList=newBarcodes.filter(item=>barcodeInItemList.includes(item));
    return (sameElementInBarcodesAndInBarcodeInItemList.length==barcodes.length)?true:false;
}


