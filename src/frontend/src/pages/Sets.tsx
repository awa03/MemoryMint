import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';


const SetsPage: React.FC = () => {
  const arrayList = ['List Item 1', 'List Item 2', 'List Item 3'];

  const UsingArrayMap = () => (
    <div>
      {
        arrayList.map((item) => (
          <div className=" mx-5 text-center p-10 m-1 bg-green-500 rounded-sm text-2xl font-extrabold text-gray-100 hover:border-blue-500 hover:bg-green-400">{item}</div>
        ))
      }
    </div>
  );
  return (
    <div className="min-h-screen">
      <Navigation></Navigation>
      <UsingArrayMap></UsingArrayMap>
    </div>
  )
}

export default SetsPage;
