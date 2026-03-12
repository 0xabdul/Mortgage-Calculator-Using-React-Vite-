import { useState } from 'react'
import './App.css'

function App() {
  const [res,setres]=useState(false);
  const[co,setco]=useState(true);
  const [amount,setamount]=useState("");
  const [year,setyear]=useState("");
  const [rate,setrate]=useState("");
  const [month,setmonth]=useState(0);
  const [err,seterr]=useState(false);
  const [total,settotal]=useState(0);
  const [type,settype]=useState("repay");
  const late=()=>{
    setres(true);
    setco(false);
    if (amount === "" || year === "" || rate === ""){
      seterr(true);
    }
    else{
      seterr(false);
    }
    const p = Number(amount);
    const r = Number(rate)/100/12;
    const n = Number(year)*12;
    let monthpay=0;
    if (type ==="repay"){
      monthpay= p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    else{
      monthpay = p*r;
    }
    setmonth(monthpay.toFixed(2));
    settotal((monthpay*n).toFixed(2));

  };
  const clearman=()=>{
    setamount("");
    setrate("");
    setyear("");
    setres(false);
    setco(true);
    seterr(false);
  };

  return (
     <div>
     <div className='container'>
      <div className='first-cont'>
        <div className='first-fl'>
      <div className='first-name'>
       <h1>Mortgage Calculator</h1> 
      </div>
      <div className='clearlink'>
        <p onClick={clearman}>Clear All</p>
      </div>
      </div>
      <div className='mortgage-name'>
        <p>Mortgage Amount</p>
        <input type='number' className='one' onChange={(e)=> setamount(e.target.value)} value={amount} style={{border: err ? "1.2px solid red" : "1.2px solid gray"}}></input>
      </div>
      <div className='term-name'>
        <div className='dothis'>
        <p>Mortgage Term</p>
        <input type='number' className='two' onChange={(e)=> setyear(e.target.value)} value={year} style={{border: err ? "1.2px solid red" : "1.2px solid gray"}}></input>
        </div>
        <div className='dothison'>
        <p>Interest Rate</p>
        <input type='number' className='three' onChange={(e)=> setrate(e.target.value)} value={rate} style={{border: err ? "1.2px solid red" : "1.2px solid gray"}}></input>
        </div>
      </div>
      <div className='type'>
        <p>Mortgage Type</p>
        <div className='repay-flex'>
        <input type='radio' value={"repay"} checked={type === "repay"} onChange={(e)=>settype(e.target.value)}></input>
        <p>Repayment</p>
        </div>
        <div className='int-flex'>
        <input type='radio' value={"interest"} checked={type === "interest"} onChange={(e)=>settype(e.target.value)}></input>
        <p>Interest Only</p>
        </div>
      </div>
      <br></br>
      <div className='cal-btn' onClick={late}>
        <img src='/icon-calculator.svg' alt='calculator-img'></img>
        <button>Calculate Repayments</button>
      </div>
      </div>
      <div className='box1'>
        {co &&(
        <div className='sec-cont'>
        <div className='imgs'>
          <img src='/illustration-empty.svg' alt='empty-img'></img>
        </div>
        <div className='name-result'>
          <h2>Result Show Here</h2>
          <p className='n'>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
        </div>
        </div>
        )}
        {res && (
        <div className='result-show'>
          <h3>Your Result</h3>
          <div className='dis-show'>
            <p className='cont'>Your results Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
          </div>
          <div className='cal-show-card'>
            <div className='line'>
            <div className='cal-show-name'>
              <p className='cal'>Your Monthly Repayments</p>
            </div>
            <div className='data-cal'>
              <p className='dataone'>{month}</p>
            </div>
            </div>
            <div className='total-cal'>
              <div className='total-name'>
                <p className='cal'>Total you'll repay over the term</p>
              </div>
              <div className='cal-total-num'>
                <p className='datatwo'>{total}</p>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
     </div>
     </div>
  )
}
export default App
