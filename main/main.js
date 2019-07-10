'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
const isBarcodesValid=(barcodes)=>{//传进来的实际是tags
    const itemList=loadAllItems();
    let count=0;
    for(let i=0;i<barcodes.length;i++){
        if(barcodes[i].length>10){
            let str=barcodes[i].split("-")[0];
            for(let j=0;j<itemList.length;j++){
                if(str==itemList[j].barcode){
                    count++;
                    break;
                }
            }
            barcodes[i].split("-")[0]
        }
        else{
            for(let j=0;j<itemList.length;j++){
                if(barcodes[i]==itemList[j].barcode){
                    count++;
                    break;
                }
            }
        }
    }
    if(count==barcodes.length)
    return true;
    else
    return false;
}


