import React from 'react';

const Accordion = () => {
  return (
    <div className='my-28 mx-8 lg:mx-auto'>
      <h2 className='text-center text-3xl mb-8 text-secondary-focus font-semibold font-sans '>Have you any question about TechMate?</h2>
      <div className='bg-accent rounded-lg py-8 shadow-xl'>
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-10">
           <div className="collapse-title text-xl font-medium text-secondar">
          Is this a Tech shop?
          </div>
         <div className="collapse-content"> 
            <p> No, TechMate is a online used computer service.</p>
        </div>
      </div>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mx-10">
          <div className="collapse-title text-xl font-medium">
              Where are your service area??
         </div>
         <div className="collapse-content"> 
            <p> No, TechMate service is just available in the inside of the Italy.</p>
        </div>
      </div>
      </div>
   </div>
  );
};

export default Accordion;