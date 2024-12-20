import React from 'react'
import RangeSlider from './RangeSlider'
import CategoryDropdown from './CategoryDropdown'
const LeftSliders = ({setSelectedEvent,yearRange,setYearRange,setSelectedCategory}) => {
  return (
    <div
                className={`Left-Sliders`}
              >
                <RangeSlider
                  setSelectedEvent={setSelectedEvent}
                  yearRange={yearRange}
                  setYearRange={setYearRange}
                />
                <div className='bottm flex justify-evenly items-center' >

                <div className="flex items-center gap-10">
                  <div className="flex items-center space-x-4">
                    <label className="font-medium text-gray-700">
                      Start Year:
                    </label>
                    <span className="text-gray-600">{yearRange.startYear}</span>
                  </div>
                 
                  <CategoryDropdown
                    onCategoryChange={setSelectedCategory}
                    clr={setSelectedEvent}
                    />
                   <div className="flex items-center space-x-4">
                    <label className="font-medium text-gray-700">
                      End Year:
                    </label>
                    <span className="text-gray-600">{yearRange.endYear}</span>
                  </div>
                </div>
                    </div>
              </div>
  )
}

export default LeftSliders;
