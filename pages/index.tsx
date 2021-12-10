import React from "react";
import type {GetStaticProps, InferGetServerSidePropsType, NextPage} from 'next'
import {format} from 'date-fns'

import {SelectForm} from "../components/select-form";

type Assessment = {
  product_name: string,
  brand_name: string,
  price: number,
  address: {
    state: string,
    city: string,
  }
  discription: string;
  date: string;
  time: string;
  image: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Request data from external API
  const res = await fetch('https://assessment-edvora.herokuapp.com/');
  // Parse as JSON
  const assessments: Assessment[] = await res.json();

  // Get the products name and remove duplicates
  const products = Array.from(new Set(assessments.map(assessment => assessment.product_name))).sort();
  // Get the states and remove duplicates
  const states = Array.from(new Set(assessments.map(assessment => assessment.address.state))).sort();
  // Get the cities and remove duplicates
  const cities = Array.from(new Set(assessments.map(assessment => assessment.address.city))).sort();

  return {
    props: {
      assessments,
      products,
      states,
      cities,
    }
  }
}

// @ts-ignore
const Home: NextPage = ({
  assessments,
  products,
  states,
  cities
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [data, setData] = React.useState<Assessment[]>(assessments);

  React.useEffect(() => {
    let filteredAssessments: Assessment[] = assessments;

    if (selectedProduct) {
      filteredAssessments = filteredAssessments.filter((assessment: Assessment) => {
        return assessment.product_name === selectedProduct;
      });
    }

    if (selectedState) {
      filteredAssessments = filteredAssessments.filter((assessment: Assessment) => {
        return assessment.address.state === selectedState;
      });
    }

    if (selectedCity) {
      console.log(selectedCity);
      filteredAssessments = filteredAssessments.filter((assessment: Assessment) => {
        return assessment.address.city === selectedCity;
      });
    }

    setData(filteredAssessments);
  }, [selectedProduct, selectedState, selectedCity, assessments]);

  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="grid-cols-1">
        {/* Filters component */}
        <div className="bg-stone-900 p-5 rounded-lg space-y-4">
          <h2 className="text-xl text-stone-300">Filters</h2>

          <hr className="border-t border-stone-400"/>

          <div className="flex flex-col space-y-3">
            <SelectForm label="Product" options={products} onChange={(e) => setSelectedProduct(e.target.value)}/>
            <SelectForm label="State" options={states} onChange={(e) => setSelectedState(e.target.value)}/>
            <SelectForm label="City" options={cities} onChange={(e) => setSelectedCity(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="col-span-4 space-y-5">
        <h1 className="text-4xl text-stone-300 font-bold">Edvora</h1>
        <h2 className="text-3xl text-stone-300">Products</h2>

        {/* Products component */}
        <div className="flex flex-col space-y-4">
          {/* @ts-ignore */}
          {products.map((product: string, productIdx: number) => (
            <div key={productIdx} className="w-full space-y-4">
              <h3 className="text-xl text-stone-100">{product}</h3>

              <hr className="border-t border-stone-400"/>

              <div className="flex space-x-4 overflow-x-auto bg-stone-900 rounded-lg p-4">
                {data.filter((assessment: Assessment) => assessment.product_name === product)
                  .map((assessment: Assessment, assessmentIdx: number) => (
                    <div key={assessmentIdx} className="flex flex-col space-y-2 p-3 bg-stone-800 rounded-lg">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={assessment.image}
                            alt={assessment.product_name}
                            className="object-dover object-center"
                          />
                        </div>
                        <div className="flex-grow space-y-2">
                          <h4 className="text-lg text-stone-100 whitespace-nowrap">{assessment.product_name}</h4>
                          <p className="text-sm text-stone-400">{assessment.brand_name}</p>
                          <p className="text-sm text-stone-300">$ {assessment.price}</p>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-col">
                        <div className="flex space-x-3">
                          <div className="flex-1 text-xs text-stone-400 whitespace-nowrap">
                            {assessment.address.city}, {assessment.address.state}
                          </div>
                          <div className="flex-1 text-xs text-stone-400 whitespace-nowrap">
                            Date: <time dateTime={assessment.date}>{format(new Date(assessment.date), 'dd:MM:yyyy')}</time>
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-stone-400">{assessment.discription}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
