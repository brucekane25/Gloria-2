import React from 'react'

const RightSliders = ({colors, pages, currentPage, setCurrentPage, setLimit, limit, filterTotalEvents, totalEvents}) => {
  return (
      <div className="Right-Sliders ">
              <div className="flex items-center space-x-4">
                <button
                  style={{ backgroundColor: colors.primary }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {pages}
                </span>
                <button
                  style={{ backgroundColor: colors.primary }}
                  disabled={currentPage === pages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === pages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <label className="font-medium text-gray-700">
                  Events Per Page:
                  <input
                    type="range"
                    min="1"
                    max="10000"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="ml-2"
                  />
                </label>
                <span className="text-gray-600">{limit}</span>
                <span className="text-gray-600">Total Events: {totalEvents}, Filtered Events: {filterTotalEvents}</span>
              </div>
            </div>
  )
}

export default RightSliders
