import React from 'react'

const P2Pregister = (props) => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        pancard: '',
        accountNo: '',
        ifsc: '',
      });
    
      React.useEffect(() => {
        // Save input values when they change
        console.log(formData); // You can replace console.log with your save function
      }, [formData]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  return (
    <div className=' p-5 flex flex-col w-[372px] rounded-2xl [background:linear-gradient(180.13deg,_#202020,_#181818)] box-border  overflow-hidden text-left text-[0.875rem] text-white font-inter border-t-[2px] border-solid border-[#282828] border-r-[1px] border-l-[1px]'>
    <div className="flex mb-7 items-center ">
    <b className="w-2/3 relative text-[1rem] inline-block font-inter text-white text-right">Your Wallet</b>
    <img onClick={props.close}  className='w-[14.2px] cursor-pointer mx-auto pl-8 object-cover relative' src="https://i.imgur.com/9UTCyDM.png" alt="" />
    </div>
    <div className="w-[5.813rem] relative text-[0.75rem] font-inter text-white text-left inline-block">Enter the details</div>
    <div className="flex w-full flex-col mt-8 gap-5">
    <input
     name="name"
     value={formData.name}
     onChange={handleChange}
    placeholder='Name' className='w-[280px]  p-2 mx-auto relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] text-lightgray font-inter' type="text"  id="" />
    <input
     name="email"
          value={formData.email}
          onChange={handleChange}
    placeholder='Email' className='w-[280px]  p-2 mx-auto relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] text-lightgray font-inter' type="text"  id="" />
    <input
     name="pancard"
          value={formData.pancard}
          onChange={handleChange}
    placeholder='Pancard' className='w-[280px]  p-2 mx-auto relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] text-lightgray font-inter' type="text"  id="" />
    <input
     name="accountNo"
          value={formData.accountNo}
          onChange={handleChange}
    placeholder='Account No.' className='w-[280px]  p-2 mx-auto relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] text-lightgray font-inter' type="text"  id="" />
    <input
     name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
    placeholder='IFSC Code ' className='w-[280px]  p-2 mx-auto relative rounded bg-white h-[2.688rem] overflow-hidden text-left text-[0.875rem] text-lightgray font-inter' type="text"  id="" />
    </div>

    <div className="w-[162px] mt-4 mx-auto flex items-center justify-center relative rounded-[97px] bg-cornflowerblue box-border h-[2.313rem] overflow-hidden text-left text-[0.875rem] text-white font-inter border-t-[1px] border-solid border-lightskyblue border-r-[1px] border-l-[1px]">
<div className=" font-medium">Continue</div>
</div>
  </div>
  )
}

export default P2Pregister;
