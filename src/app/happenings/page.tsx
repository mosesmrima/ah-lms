"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PageLayout } from "@/components/layout";
import PageTransition from "@/components/animations/PageTransition";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";
import StaggeredAnimation from "@/components/animations/StaggeredAnimation";

// Event card component for the upcoming events section
const EventCard = ({ 
  date, 
  title, 
  description, 
  location, 
  imageSrc 
}: { 
  date: string; 
  title: string; 
  description: string; 
  location: string; 
  imageSrc: string;
}) => {
  return (
    <div className="relative rounded-lg overflow-hidden border border-[#333] bg-[#1E1E1E]">
      <div className="relative h-48 w-full">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 text-xs rounded">
          {date}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">{location}</span>
          <Button customVariant="primary" size="xs">
            Join In
          </Button>
        </div>
      </div>
    </div>
  );
};

// Update card component for the other updates section
// Component defined for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _UpdateCard = ({ 
  title, 
  description, 
  buttonText, 
  imageSrc 
}: { 
  title: string; 
  description: string; 
  buttonText: string; 
  imageSrc?: string;
}) => {
  return (
    <div className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-[#333] p-6">
      {imageSrc && (
        <div className="mb-4">
          <Image 
            src={imageSrc} 
            alt={title} 
            width={100} 
            height={100} 
            className="rounded-md"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <Button customVariant="primary" fullWidth>
        {buttonText}
      </Button>
    </div>
  );
};

// Tweet component for the X Feeds section
// Component defined for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _Tweet = ({ 
  username, 
  handle, 
  content, 
  profilePic 
}: { 
  username: string; 
  handle: string; 
  content: string; 
  profilePic: string;
}) => {
  return (
    <div className="flex gap-3 mb-4 pb-4 border-b border-[#333]">
      <Image 
        src={profilePic} 
        alt={username} 
        width={40} 
        height={40} 
        className="rounded-full"
      />
      <div>
        <div className="flex items-center gap-1">
          <span className="font-bold text-white">{username}</span>
          <span className="text-gray-500">@{handle}</span>
        </div>
        <p className="text-gray-300 text-sm mt-1">{content}</p>
      </div>
    </div>
  );
};

function HappeningsPage() {
  // Sample data for events
  const events = [
    {
      id: 1,
      date: "May 15-16, 2025",
      title: "Hackathon on Cybersecurity",
      description: "Engage in an exciting and intensive two-day event full of learning, collaboration, and innovation in the field.",
      location: "Virtual Event",
      imageSrc: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      date: "June 5-6, 2025",
      title: "Hackathon on Cybersecurity",
      description: "Engage in an exciting and intensive two-day event full of learning, collaboration, and innovation in the field.",
      location: "Virtual Event",
      imageSrc: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      date: "June 20, 2025",
      title: "Hackathon on Cybersecurity",
      description: "Engage in an exciting and intensive two-day event full of learning, collaboration, and innovation in the field.",
      location: "Virtual Event",
      imageSrc: "https://images.pexels.com/photos/5380659/pexels-photo-5380659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      date: "July 10-11, 2025",
      title: "Hackathon on Cybersecurity",
      description: "Engage in an exciting and intensive two-day event full of learning, collaboration, and innovation in the field.",
      location: "Virtual Event",
      imageSrc: "https://images.pexels.com/photos/5380687/pexels-photo-5380687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  // Sample data for updates - will be used in the future
  /* Commented out to fix ESLint error
  const updates = [
    {
      id: 1,
      title: "Intro to Cybersecurity",
      description: "Explore the world of cybersecurity through this interactive session that covers fundamentals, common threats, and basic defense strategies. Perfect for beginners.",
      buttonText: "Listen",
      imageSrc: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      title: "Intro to Cybersecurity",
      description: "Explore the world of cybersecurity through this interactive session that covers fundamentals, common threats, and basic defense strategies. Perfect for beginners.",
      buttonText: "Read",
      imageSrc: "https://images.pexels.com/photos/5380591/pexels-photo-5380591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  */

  // Sample data for tweets
  const tweets = [
    {
      id: 1,
      username: "Billy John",
      handle: "billyjohn",
      content: "Just attended an amazing cybersecurity workshop by @AfricaHackon. Learned so much today!",
      profilePic: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      username: "Sarah Miller",
      handle: "sarahmiller",
      content: "Excited to apply for the upcoming hackathon. Who else is joining? #CyberHack #AfricaHackon",
      profilePic: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      username: "James Wilson",
      handle: "jameswilson",
      content: "Just attended an amazing cybersecurity workshop by @AfricaHackon. Learned so much today!",
      profilePic: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 4,
      username: "Emily Davis",
      handle: "emilydavis",
      content: "Excited to apply for the upcoming hackathon. Who else is joining? #CyberHack #AfricaHackon",
      profilePic: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 5,
      username: "Michael Brown",
      handle: "michaelbrown",
      content: "Just attended an amazing cybersecurity workshop by @AfricaHackon. Learned so much today!",
      profilePic: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <PageTransition>
      <PageLayout>
        <div className="pb-16">
          {/* Hero Section */}
          <AnimateOnScroll direction="down" className="w-full">
            <section className="relative bg-black py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-16">
              <div className="container mx-auto">
                <div className="w-full max-w-[1318px] h-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 bg-[#1E1E1E] rounded-[20px] sm:rounded-[30px] mx-auto overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-12 w-full">
                    <div className="w-full md:w-[55%] flex flex-col justify-start items-start gap-4 sm:gap-6 md:gap-10">
                      <div className="flex flex-col justify-start items-start gap-3 sm:gap-4 md:gap-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                          Africahackon Academy Happenings: Elevate Your Learning
                        </h1>
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                          Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts, and much more. Be the first to know about upcoming events with our live announcements, keeping you informed and inspired.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-4 w-full">
                        <Button customVariant="primary" className="w-full sm:flex-1">
                          Sign Up
                        </Button>
                        <Button customVariant="secondary" className="w-full sm:flex-1">
                          Join Our Newsletter
                        </Button>
                      </div>
                    </div>
                    <div className="w-full md:w-[45%] flex justify-center items-center mt-6 md:mt-0">
                      <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-square">
                        <Image 
                          src="/images/happenings.png" 
                          alt="Happenings illustration" 
                          width={400} 
                          height={400}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimateOnScroll>

          {/* Partners */}
          <AnimateOnScroll direction="up" delay={0.2} className="w-full">
            <section className="py-6 sm:py-8">
              <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16">
                  <Image src="/images/image 5.png" alt="Business Daily" width={120} height={40} className="object-contain w-[80px] sm:w-[100px] md:w-[120px]" />
                  <Image src="/images/image 6.png" alt="TechCabal" width={120} height={40} className="object-contain w-[80px] sm:w-[100px] md:w-[120px]" />
                  <Image src="/images/image 7.png" alt="Business Insider" width={120} height={40} className="object-contain w-[80px] sm:w-[100px] md:w-[120px]" />
                  <Image src="/images/image 8.png" alt="CIO Africa" width={120} height={40} className="object-contain w-[80px] sm:w-[100px] md:w-[120px]" />
                </div>
              </div>
            </section>
          </AnimateOnScroll>

          {/* Upcoming Events */}
          <AnimateOnScroll direction="up" delay={0.3} className="w-full">
            <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12">
              <div className="container mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Upcoming Events</h2>
                <StaggeredAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {events.map(event => (
                    <EventCard 
                      key={event.id}
                      date={event.date}
                      title={event.title}
                      description={event.description}
                      location={event.location}
                      imageSrc={event.imageSrc}
                    />
                  ))}
                </StaggeredAnimation>
              </div>
            </section>
          </AnimateOnScroll>

          {/* Other Updates */}
          <AnimateOnScroll direction="up" delay={0.4} className="w-full">
            <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12">
              <div className="container mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Other Updates</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <StaggeredAnimation>
                      <div className="relative inline-flex flex-col justify-start items-start gap-2.5 w-full mb-8">
                        <div className="w-full md:w-[790px] h-96 bg-[#1E1E1E] rounded-[30px] relative overflow-hidden">
                          
                        </div>
                        <div className="left-[45px] top-[36px] absolute inline-flex justify-start items-center gap-10">
                          <div className="w-80 h-72 bg-[#1E1E1E] rounded-[30px] relative overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              alt="Podcast thumbnail"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="inline-flex flex-col justify-start items-start gap-6">
                            <div className="flex flex-col justify-start items-start gap-6">
                              <div className="flex flex-col justify-start items-start gap-2">
                                <div className="justify-start text-red-500 text-xs font-bold leading-tight tracking-tight">Podcast</div>
                                <div className="justify-start text-white text-2xl font-black">Intro to Cybersecurity</div>
                              </div>
                              <div className="w-80 justify-start text-gray-300 font-normal font-['Helvetica'] leading-snug">
                                Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts, and much more. Be the first to know about upcoming events with our live announcements, keeping you informed and inspired.
                              </div>
                            </div>
                            <Button customVariant="primary" size="lg" className="w-56">
                              Listen
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative inline-flex flex-col justify-start items-start gap-2.5 w-full">
                        <div className="w-full md:w-[790px] h-96 bg-[#1E1E1E] rounded-[30px]" />
                        <div className="left-[45px] top-[36px] absolute inline-flex justify-start items-center gap-10">
                          <div className="w-80 h-72 bg-[#1E1E1E] rounded-[30px] relative overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              alt="Podcast background"
                              fill
                              className="object-cover opacity-20"
                            />
                          </div>
                          <div className="inline-flex flex-col justify-start items-start gap-6">
                            <div className="flex flex-col justify-start items-start gap-6">
                              <div className="flex flex-col justify-start items-start gap-2">
                                <div className="justify-start text-red-500 text-xs font-bold font-['Satoshi'] leading-tight tracking-tight">Webinar</div>
                                <div className="justify-start text-white text-2xl font-black font-['Satoshi']">Intro to Cybersecurity</div>
                              </div>
                              <div className="w-80 justify-start text-gray-300 text-base font-normal font-['Helvetica'] leading-snug">Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts, and much more. Be the first to know about upcoming events with our live announcements, keeping you informed and inspired.</div>
                            </div>
                            <Button customVariant="primary" size="lg" className="w-56">
                              RSVP
                            </Button>
                          </div>
                        </div>
                      </div>
                    </StaggeredAnimation>
                  </div>
                  
                  <div className="md:w-[476px]">
                    <div className="w-full md:w-[476px] h-[765px] relative">
                      <div className="w-full md:w-[476px] h-[765px] left-0 top-0 absolute bg-[#1E1E1E] rounded-[30px]" />
                      <div className="left-[207px] top-[716px] absolute justify-start text-red-500 text-xs font-bold font-['Satoshi'] leading-tight tracking-tight cursor-pointer hover:text-red-400">Load More</div>
                      <div className="w-full md:w-[476px] h-20 left-0 top-0 absolute bg-[#1E1E1E] rounded-tl-[30px] rounded-tr-[30px] border-b border-neutral-600" />
                      <div className="left-[44px] top-[31px] absolute justify-start text-white text-2xl font-black font-['Satoshi']">X Feeds</div>
                      <div className="left-[1px] top-[96px] absolute inline-flex flex-col justify-start items-center gap-4 w-full md:w-[476px]">
                        <StaggeredAnimation className="w-full" staggerChildren={0.05}>
                          {tweets.map((tweet, index) => (
                            <div key={tweet.id} className="w-full">
                              <div className="inline-flex justify-start items-center gap-4 px-4 w-full">
                                <div className="flex justify-center items-center">
                                  <Image className="w-16 h-16 rounded-[20px] border-2 border-red-500 object-cover" src={tweet.profilePic} alt={tweet.username} width={64} height={64} />
                                </div>
                                <div className="inline-flex flex-col justify-start items-start gap-2">
                                  <div className="justify-start">
                                    <span className="text-white text-xl font-black font-['Satoshi']">{tweet.username}</span>
                                    <span className="text-white text-2xl font-black font-['Satoshi']"> </span>
                                    <span className="text-white text-base font-normal font-['Helvetica']">@{tweet.handle}</span>
                                  </div>
                                  <div className="w-80 justify-start text-gray-300 text-base font-normal font-['Helvetica'] leading-snug">
                                    {tweet.content}
                                  </div>
                                </div>
                              </div>
                              {index < tweets.length - 1 && (
                                <div className="w-full md:w-[475px] h-0 outline outline-2 outline-offset-[-1px] outline-zinc-800 mt-4"></div>
                              )}
                            </div>
                          ))}
                        </StaggeredAnimation>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimateOnScroll>
        </div>
      </PageLayout>
    </PageTransition>
  );
};

export default HappeningsPage;
