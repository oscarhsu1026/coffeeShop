import './sass/style.scss';
import { useEffect, useState,useLayoutEffect} from 'react';
import dayjs from 'dayjs';


const drinkEnToZhTW={
  americano:"美式咖啡",
  coldRewCoffee:"冷翠咖啡",
  vanillaSweetCreamColdBrewCoffee:"經典特調冷萃咖啡",
  mocha:"摩卡",
  espresso:"濃縮咖啡",
  cappuccino:"卡布奇諾",
  macchiato:"瑪奇朵",
  caramelMacchiato:"焦糖瑪奇朵",
  latte:"拿鐵咖啡",
  toffeeNutLatte:"太妃榛果拿鐵",
  greenTeaLatte:"抹茶拿鐵",
  vanillaLatte:"香草拿鐵",
}

const sugarLevelToZhTW={
  '0':'無糖',
  '20':'微糖',
  '50':'半糖',
  '70':'7分糖',
  '100':'正常糖'
}
const iceLevelToZhTW={
  '0':'去冰',
  '20':'微冰',
  '50':'少冰',
  '100':'正常冰',
}


function DrinkDetailPopup({handlePerSelectedDrink,selectedDrink,handleSelectDrink}){

  const [iceSelected,setIceSelected]=useState(null);
  const [sugarSelected,setSugarSelected]=useState(null);
  const [sizeSelected,setSizeSelected]=useState(null);
  const [selectedDrinkDetail,setSelectedDrinkDetail]=useState({...selectedDrink});
  useEffect(()=>{
    let perDrinKNumber=parseInt(selectedDrinkDetail.number);
    let perDrinkPrice=parseInt(selectedDrinkDetail.price);
    if(perDrinKNumber&&perDrinKNumber){
      setSelectedDrinkDetail({...selectedDrinkDetail,totalPrice:perDrinKNumber*perDrinkPrice});
    }
  },[selectedDrinkDetail?.number]);

  useLayoutEffect(()=>{
    setSelectedDrinkDetail({...selectedDrink});
  },[selectedDrink])

  const handleInputChange=(value,field)=>{
    if(field=='ice_level'){
      if(iceSelected||iceSelected=='0'){
        document.getElementById("iceLevelBTN"+iceSelected).classList.remove('highlight');
      }
      document.getElementById("iceLevelBTN"+value).classList.add('highlight');
      setIceSelected(value);
      let tempIce_level={isHot:false,level:0};
      if(value=='Hot'){
        tempIce_level['isHot']=true;
        tempIce_level['level']='0';
      }else{
        tempIce_level['level']=value;
        tempIce_level['isHot']=false;
      }
      setSelectedDrinkDetail({...selectedDrinkDetail,[field]:tempIce_level});

    }else if(field=='sugar_level'){
      if(sugarSelected||sugarSelected=='0'){
        document.getElementById("sugerLevelBTN"+sugarSelected).classList.remove('highlight');
      }
      document.getElementById("sugerLevelBTN"+value).classList.add('highlight');
      setSugarSelected(value);
      setSelectedDrinkDetail({...selectedDrinkDetail,[field]:value})
    }else if(field=='size'){
      if(sizeSelected){
        document.getElementById("size"+sizeSelected).classList.remove('highlight');
      }
      document.getElementById("size"+value).classList.add('highlight');
      setSizeSelected(value);
      setSelectedDrinkDetail({...selectedDrinkDetail,[field]:value})
    }
    else{
      setSelectedDrinkDetail({...selectedDrinkDetail,[field]:value})
    }
   
  }
  const cleanDrinkDetail=()=>{
    if(iceSelected){
      document.getElementById("iceLevelBTN"+iceSelected).classList.remove('highlight');
      setIceSelected(null);
    }
    if(sizeSelected){
      document.getElementById("size"+sizeSelected).classList.remove('highlight');
      setSizeSelected(null);
    }
    if(sugarSelected){
      document.getElementById("sugerLevelBTN"+sugarSelected).classList.remove('highlight');
      setSugarSelected(null);
    }
    if(selectedDrinkDetail.number){
        setSelectedDrinkDetail({...setSelectedDrinkDetail,number:0})
    } 
    document.getElementById("drinkDetailPopup").style.display='none';

  }

  const checkValueCorrect=(selectedDrink)=>{
    return parseInt(selectedDrink?.number)&&parseInt(selectedDrink?.number)>0&&selectedDrink?.ice_level&&selectedDrink?.sugar_level&&selectedDrink?.size;
  }

  return(
    <div className="popupCover" id="drinkDetailPopup">
      <div className="drinkDetailPopupCon">
          <div className="drinkDetailHeader">
            <div>
              <h3>{drinkEnToZhTW[selectedDrinkDetail.name]?drinkEnToZhTW[selectedDrinkDetail.name]:"未知"}</h3>
            </div>
            <div><button onClick={()=>{
              handleSelectDrink(null);
              cleanDrinkDetail();
            }}>關閉</button></div>
          </div>
          <div className="drinkDetailPerContent">
              <div>糖度</div>
              <div className="BTNGroup">
                <button id="sugerLevelBTN0"  onClick={()=>{handleInputChange('0','sugar_level')}}>無糖</button>
                <button id="sugerLevelBTN20"  onClick={()=>{handleInputChange('20','sugar_level')}}>微糖</button>
                <button id="sugerLevelBTN50"  onClick={()=>{handleInputChange('50','sugar_level')}}>半糖</button>
                <button id="sugerLevelBTN70"  onClick={()=>{handleInputChange('70','sugar_level')}}>7分糖</button>
                <button id="sugerLevelBTN100"  onClick={()=>{handleInputChange('100','sugar_level')}}>正常</button>
              </div>
          </div>
          <div className="drinkDetailPerContent">
              <div>溫度</div>
              <div className="BTNGroup">
                <button id="iceLevelBTNHot"  onClick={()=>{handleInputChange('Hot','ice_level')}}>熱飲</button><button id="iceLevelBTN0" onClick={()=>{handleInputChange('0','ice_level')}}>去冰</button><button  id="iceLevelBTN20" onClick={()=>{handleInputChange('20','ice_level')}}>微冰</button>
                <button id="iceLevelBTN50" onClick={()=>{handleInputChange('50','ice_level')}}>少冰</button><button id="iceLevelBTN100" onClick={()=>{handleInputChange('100','ice_level')}}>正常</button>
              </div>
          </div>
          <div className="drinkDetailPerContent">
              <div>大小</div>
              <div className="BTNGroup">
                <button id="sizeS"  onClick={()=>{handleInputChange('S','size')}}>小</button>
                <button id="sizeM" onClick={()=>{handleInputChange('M','size')}}>中</button>
                <button  id="sizeL" onClick={()=>{handleInputChange('L','size')}}>大</button>
                <button id="sizeXL" onClick={()=>{handleInputChange('XL','size')}}>特大</button>
              </div>
          </div>
          <div className="drinkDetailPerContent priceAndSubmit">
            <div>
              <label>數量
                <input type="number" value={selectedDrinkDetail.number} onChange={(e)=>{handleInputChange(e.target.value,'number')}}/>
              </label>
              <div className="numberPrice">
                <div>總價</div>
                <div className="totalPrice">{selectedDrinkDetail?.totalPrice?selectedDrinkDetail.totalPrice:0}</div>
              </div>
            </div>
            <div>
            <button className="submitBTN" onClick={()=>{
              if(checkValueCorrect(selectedDrinkDetail)){
                handlePerSelectedDrink({...selectedDrinkDetail,ID:dayjs().unix()});
                cleanDrinkDetail();
              }else{
                alert("請將選擇正確的糖度、冰量、大小及數量")
              }
          }}>確定</button>
            </div>
          </div>

      </div>
    </div>
  )
}

function DrinkListChoicePopup({handlePerSelectedDrink}){

    const [selectedDrink,setSelectedDrink]=useState({number:0});


    const handleSelectDrink=(selectedElement)=>{
      if(selectedElement){
        let drinkName=selectedElement.childNodes[0].getAttribute('data-drink-name');
        let drinkPrice=parseInt(selectedElement.childNodes[1].getAttribute('data-drink-price'));
        setSelectedDrink({...selectedElement,name:drinkName,price:drinkPrice});
        document.getElementById("drinkDetailPopup").style.display="flex";
      }else{
        document.getElementById("drinkDetailPopup").style.display="none";
      }

    }

    return (
      <div className="popupCover" id="drinkListChoicePopup">
        <div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="americano">美式咖啡</div><div style={{width:'100px',display:"inline-block"}} data-drink-price="60">60</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="mocha">摩卡</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="55">55</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="coldRewCoffee">冷翠咖啡</div><div style={{width:'100px',display:"inline-block"}} data-drink-price="110">110</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="vanillaSweetCreamColdBrewCoffee">經典特調冷萃咖啡</div><div style={{width:'100px',display:"inline-block"}} data-drink-price="120">120</div>
              </div>

        </div>

        <div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="espresso">濃縮咖啡</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="80">80</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="cappuccino">卡布奇諾</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="70">70</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="macchiato">瑪奇朵</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="60">60</div>
              </div> 
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="caramelMacchiato">焦糖瑪奇朵</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="65">65</div>
              </div>
        </div>
        <div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}}  data-drink-name="latte">拿鐵咖啡</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="50">50</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}}  data-drink-name="toffeeNutLatte">太妃榛果拿鐵</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="60">60</div>
              </div>
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                <div style={{width:'150px',display:"inline-block"}} data-drink-name="greenTeaLatte">抹茶拿鐵</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="60">60</div>
              </div> 
              <div  className="clickableItem" onClick={(e)=>{handleSelectDrink(e.currentTarget)}}>
                 <div style={{width:'150px',display:"inline-block"}} data-drink-name="vanillaLatte">香草拿鐵</div><div style={{width:'100px',display:"inline-block"}}  data-drink-price="55">55</div>
              </div>
        </div>

      
          <DrinkDetailPopup handlePerSelectedDrink={handlePerSelectedDrink} selectedDrink={selectedDrink} handleSelectDrink={handleSelectDrink}/>
      </div>
    )
}




function OrderProcessRightSideLeft({tempPerSelectedDrink,handlePerSelectedDrink,handleSubmitAddNewOrder,modifyOrder,setTempPerSelectedDrink,setIsOpenRightSide}){

  const [tempOrder,setTempOrder]=useState({ID:dayjs().unix(),time:dayjs().toISOString(),drinks:[],note:''});
  
  useEffect(()=>{
    if(tempPerSelectedDrink){
      let tempNewOrder={...tempOrder};
      tempNewOrder.drinks.push(tempPerSelectedDrink);
      setTempOrder(tempNewOrder);
      handlePerSelectedDrink(null);
    }
  },[tempPerSelectedDrink])

  useLayoutEffect(()=>{
    if(modifyOrder){
      setTempOrder({...modifyOrder,drinks:[...modifyOrder.drinks]})
    }else{
      setTempOrder({ID:dayjs().unix(),time:dayjs().toISOString(),drinks:[],note:''});
    }
  },[modifyOrder])


  const handelInputChange=(value,field)=>{
    setTempOrder({...tempOrder,[field]:value})
  }

  const handleDeleteDrink=(deletedOneID)=>{
    let deletedOneIndex=tempOrder.drinks.findIndex((drink)=>drink.ID==deletedOneID);
    let tempNewOrder={...tempOrder};
    tempNewOrder.drinks.splice(deletedOneIndex,1);
    setTempOrder(tempNewOrder);
  }

  
  return(
    
    <div style={{display:'none',flexDirection:'column',flex:1}} id="orderProcessRightSideLeft">
      <div className="rightSideHeader"> <h2>{modifyOrder?"修改":"新增" }訂單</h2><button className="collapseBTN" onClick={()=>{
        if(window.confirm("資料操作到一半，確定不儲存?")){
          setTempOrder({ID:dayjs().unix(),time:dayjs().toISOString(),drinks:[]});
          setTempPerSelectedDrink(null);
          document.getElementById('drinkDetailPopup').style.display="none";
          document.getElementById('drinkListChoicePopup').style.display="none";
          document.getElementById('orderProcessRightSideLeft').style.display="none";
          setIsOpenRightSide(false);
        }

      }}>{"||"}</button></div>
      <div className="rightSideContent">
        <div className="orderID">
            訂單編號 {tempOrder.ID}
        </div>
        <div>
          時間:{dayjs(tempOrder.time).format("YYYY-MM-DD HH:mm")}
        </div>
        <div>
          <h4>飲品列表 <button onClick={()=>{
          document.getElementById("drinkListChoicePopup").style.display='flex';
            
          }}>新增</button></h4>
            <ul>
            {tempOrder.drinks.map((drink)=><li>
                      <div style={{width:"80px"}}>{drinkEnToZhTW[drink.name]}</div>
                      <div>{sugarLevelToZhTW[drink.sugar_level]}, {drink?.ice_level.isHot?'熱飲':iceLevelToZhTW[drink?.ice_level.level]}</div>
                      <div>x{drink?.number}</div>
                      <div>共{drink?.totalPrice}元</div>
                      <div><button className="focusBTN" onClick={()=>{handleDeleteDrink(drink.ID)}}>刪除</button></div>
                      </li>)}          
          </ul>
        </div>
        <div className="note">
          <label>
              附註
          </label>
          <textarea value={tempOrder?.note} onChange={(e)=>{handelInputChange(e.target.value,'note')}}/>
        </div>
      </div>
 
      <div className="submitBTNCon">
        <button class="submitBTN" onClick={()=>{
        handleSubmitAddNewOrder(tempOrder,!(!modifyOrder));
        setTempOrder({ID:dayjs().unix(),time:dayjs().toISOString(),drinks:[]});
        setTempPerSelectedDrink(null);
        }}>提交</button>
        <button class="submitBTN" onClick={()=>{
            if(window.confirm("資料操作到一半，確定不儲存?")){
          setTempOrder({ID:dayjs().unix(),time:dayjs().toISOString(),drinks:[]});
          setTempPerSelectedDrink(null);
          document.getElementById('drinkDetailPopup').style.display="none";
          document.getElementById('drinkListChoicePopup').style.display="none";
          document.getElementById('orderProcessRightSideLeft').style.display="none";
          setIsOpenRightSide(false);
        }
        }}>取消</button>
      </div>

    </div>
  )
}


function PerOrder({perOrderData,deleteOrderFun,handleOrderRightSideLeftPopup,handleDeleteOrder}){
    
  return(
      <div className="perOrder">
              <div className="preOrderHeader">
                  <div  > 訂單編號: <b>{perOrderData.ID}</b> <button onClick={()=>{handleDeleteOrder(perOrderData.ID)}}>刪除</button></div>
                  <div style={{display:"inline-block",padding:"20px"}}>
                  時間: {perOrderData?.time?dayjs(perOrderData.time).format("YYYY-MM-DD HH:mm"):'無法顯示'}
                </div>
                  <div><button onClick={()=>{handleOrderRightSideLeftPopup(perOrderData)}}>編輯</button><button  className="focusBTN" onClick={()=>{deleteOrderFun(perOrderData.ID)}}>刪除</button></div>
              </div>
                <div className="drinkList">
                  <div>
                    <div> <h4>飲品列表</h4>
                    </div>
                    <ul>
                      {
                        perOrderData?.drinks&&perOrderData.drinks.map((drink)=><li>
                          <div>{drinkEnToZhTW[drink.name]}({drink.size})</div>
                          <div style={{width:'100px',padding:"10px 0px"}}>{sugarLevelToZhTW[drink.sugar_level]}, {drink?.ice_level.isHot?'熱飲':iceLevelToZhTW[drink?.ice_level.level]}</div>
                          <div style={{width:'100px',padding:"10px 0px"}}>x{drink.number}</div>
                          <div style={{width:'100px',padding:"10px 0px"}}>共{drink.totalPrice}元</div>
                        </li>)
                      }
                    </ul> 
                  </div>
                </div>
                <div className="priceAndNote">
                  <div className="note">
                    <h4>附註</h4>
                    <div>{perOrderData.note}</div>
                  </div>
                  <div className="totalPrice">
                      
                  </div>
                </div>

            </div>
    )
}



function App() {

  const [orderLists,setOrderLists]=useState([
    {
    ID:1623079396,
    time:'2021-06-05T08:10:00Z',
    drinks:[
      {
        ID:124,
        name:"americano",
        price:50,
        size:"S",
        number:2,
        ice_level:{
          isHot:false,
          level:20,
        },
        sugar_level:20,
        totalPrice:100,
      },{
        ID:126,
        name:"coldRewCoffee",
        price:50,
        size:"L",
        number:3,
        ice_level:{
          isHot:true,
          level:0
        },
        sugar_level:20,
        totalPrice:150,
      },
    ],  
    note:"明天早上取"
  },{
    ID:1623079397,
    time:'2021-06-05T08:18:00Z',
    drinks:[
      {
        name:"cappuccino",
        ID:123,
        price:50,
        size:"S",
        number:2,
        ice_level:{
          isHot:false,
          level:20,
        },
        sugar_level:20,
        totalPrice:250,
      },{
        ID:124,
        name:"latte",
        price:60,
        size:"S",
        number:8,
        ice_level:{
          isHot:true,
          level:0
        },
        totalPrice:200,
        sugar_level:20,
      },
    ],  
    note:"今天下午取"
  }
]);
  const [modifyOrder,setModifyOrder]=useState(null);
  const [tempPerSelectedDrink,setTempPerSelectedDrink]=useState(null);
  const [isOpenRightSide,setIsOpenRightSide]=useState(false);

  const findOneIndexByID=(ID, item="order")=>{
    if(item==="order"){
      return orderLists.findIndex((order)=>order.ID==ID);
    }
  }

  const handlePerSelectedDrink=(selectedDrinkDetail)=>{
      setTempPerSelectedDrink(selectedDrinkDetail);
  }

  const handleSubmitAddNewOrder=(tempOrder,isModify)=>{

    if(isModify){
      let modifyOrderIndex=orderLists.findIndex((order)=>order.ID===tempOrder.ID);
      let tempOrderLists=[...orderLists];
      tempOrderLists.splice(modifyOrderIndex,1,tempOrder);
      setOrderLists([...tempOrderLists]);
      setModifyOrder(null);
    }else{
      setOrderLists([...orderLists,tempOrder]);
      setModifyOrder(null);
    }
    setIsOpenRightSide(false);
    document.getElementById('drinkDetailPopup').style.display="none";
    document.getElementById('drinkListChoicePopup').style.display="none";
    document.getElementById('orderProcessRightSideLeft').style.display="none";

  }


  const deleteOrderFun=(orderID)=>{
    let deleteOrderIndex=findOneIndexByID(orderID);
    let tempOrderLists=[...orderLists];
    tempOrderLists.splice(deleteOrderIndex,1);
    setOrderLists(tempOrderLists);
  }

  const handleOrderRightSideLeftPopup=(order)=>{
    document.getElementById('orderProcessRightSideLeft').style.display='flex';
    if(!isOpenRightSide){
      if(order){
        setModifyOrder({...order});
      }
      setIsOpenRightSide(true);
    }else{
      if(window.confirm("資料操作到一半，確定不儲存?")){
        if(order){
          setModifyOrder({...order,drinks:[...order.drinks]});
        }else{
          setModifyOrder(null);
        }
      }
    }
  }

  const handleDeleteOrder=(orderID)=>{
    if(window.confirm("確認刪除這一筆訂單")){
      let tempOrderLists=[...orderLists];
      let deleteOrderIndex=tempOrderLists.findIndex((order)=>order.ID==orderID);
      if(deleteOrderIndex||deleteOrderIndex==0){
        tempOrderLists.splice(deleteOrderIndex,1);
        setOrderLists([...tempOrderLists]);
      }
    }
  }

  return (
    <div className="container">
      <div></div>
      <div className="content">
        <div className="orderList">
          <div className="realContent">
            <div className="abs_center" style={{flexDirection:'column'}}>
                <div className="abs_center">
                  <h1>訂單列表</h1>
                  <button onClick={()=>{handleOrderRightSideLeftPopup()}}>新增</button>
                </div>
                  {
                    orderLists.slice(0).reverse().map((order)=>(
                      <PerOrder perOrderData={order}  deleteOrderFun={deleteOrderFun}   handleOrderRightSideLeftPopup={handleOrderRightSideLeftPopup} handleDeleteOrder={handleDeleteOrder}/>
                      )
                    )
                  }
            </div>
          </div>
          <DrinkListChoicePopup handlePerSelectedDrink={handlePerSelectedDrink}/>
        </div>
        <OrderProcessRightSideLeft tempPerSelectedDrink={tempPerSelectedDrink} handlePerSelectedDrink={handlePerSelectedDrink} handleSubmitAddNewOrder={handleSubmitAddNewOrder} modifyOrder={modifyOrder} setTempPerSelectedDrink={setTempPerSelectedDrink} setIsOpenRightSide={setIsOpenRightSide}/>
      </div> 
    </div>
  );
}

export default App;
