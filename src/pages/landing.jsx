import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import React from 'react'
import { Link } from 'react-router-dom';
import companies from '../data/companies.json'
import faqs from'../data/faq.json'
import Autoplay from "embla-carousel-autoplay"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const LandingPage = () => {
  return (<main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
    <section className="text-center">
      <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-7xl
      tracking-tighter py-4">Secure your Dream Job 
      <span className="flex items-center gap-2 sm:gap-6"> and get <img src="/logo.jpeg" alt="placedlogo" className="h-12 sm:h-18 lg:h-28 rounded-2xl"/></span> </h1>

      <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl text-xs">
        Explore Upcoming Placement Drives On Campus or Find the Perfect Candidate
      </p>
    </section>
    <div className="flex gap-6 justify-center">
      <Link to='/jobs'>
        <Button variant="blue" size="xl">Find Jobs</Button>
      </Link>
      <Link to='/post-job'><Button variant="destructive" size="xl">Post a Job</Button>
      </Link>
      </div>
      <Carousel
      plugins={[Autoplay({delay:2000})]}
      className="w-full py-10">

        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({name,id,path})=>{
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/5 ">
                <img src={path} alt={name} className="h-9 sm:h-14 object-contain"/>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        </Carousel>
   
    {/* banner */}
    <img src="/banner.jpeg" className="w-full"/>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card>
      <CardHeader>
        <CardTitle>
          For job Seeker Students
          </CardTitle>
       
      </CardHeader>
      <CardContent>
       Search and apply for Placement Drives,track Applications,and more.

      </CardContent>

    </Card>
    <Card>
      <CardHeader>
        <CardTitle>
          For CRC Department
          </CardTitle>
       
      </CardHeader>
      <CardContent>
        Post jobs Details,Manage applications,and Connect with students.

      </CardContent>

    </Card>
    </section>

    <Accordion type="single" collapsible>
      {faqs.map((faq,index)=>{
        return (
          <AccordionItem key={index} value={`item-${index+10}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
    </main>
  
  );
}

export default LandingPage;
