import React from 'react';
import OilChange from './OilChange';
import CardHoverEffectDemo from '@/components/card-hover-effect-demo';
import { Wrench, Users, ShieldCheck, Clock } from "lucide-react"; 
import { title } from 'motion/react-client';

const customprojects = [{
  title: "Engine Parts",
  description: "Piston, Rings, Valves",
},
{
  title:"Electrical",
  description: "Battery, Wiring, Bulbs",
},
{
  title: "Tyres & Wheels",
  description: "Tubes, Rims, Bearings",
},
{
  title:"Btake Parts",
  description:"Pads, cables,levers",
},
{
  title:"Body Parts",
  description:"Panels, Mirrors, guards",
},
{
  title:"Fuel System",
  description:"Carb, fuel pump, filter",
}]

export default function () {
  return (
    <div>
        <OilChange title = "Spare Parts" desc = "this is spare parts page" Service_time="500 +" Service_title="Part In Stock" 
        Starting_price="All Brands" Price_title="Supported" Inspection="Same Day" Time_tile="Availability" showdetail={false}/>

        <CardHoverEffectDemo items={customprojects} />   
    </div>
  )
}
