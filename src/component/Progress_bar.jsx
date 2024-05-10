import React from 'react'
  
const Progress_bar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: '0.375rem',
        width: '100%',
        background: 'var(--teal-200, #AFECEF)',
        borderRadius: 40,
        marginLeft: 10,
        marginTop: 18,

      }
      
      const Childdiv = {
        height: '0.375rem',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:40,
        textAlign: 'right'
      }
      
    //   const progresstext = {
    //     padding: 10,
    //     color: 'black',
    //     fontWeight: 900
    //   }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        {/* <span style={progresstext}>{`${progress}%`}</span> */}
      </div>
    </div>
    )
}
  
export default Progress_bar;