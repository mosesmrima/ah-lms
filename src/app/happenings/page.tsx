"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
    <div className="relative rounded-lg overflow-hidden border border-[#333] bg-[#111]">
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
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs">{location}</span>
          <Button customVariant="primary" size="sm">
            Join In
          </Button>
        </div>
      </div>
    </div>
  );
};

// Update card component for the other updates section
const UpdateCard = ({ 
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
    <div className="bg-[#111] rounded-lg overflow-hidden border border-[#333] p-6">
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
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <Button customVariant="primary" fullWidth>
        {buttonText}
      </Button>
    </div>
  );
};

// Tweet component for the X Feeds section
const Tweet = ({ 
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

export default function HappeningsPage() {
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

  // Sample data for updates
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

  // Sample data for tweets
  const tweets = [
    {
      id: 1,
      username: "Billy John",
      handle: "billyjohn",
      content: "Just attended an amazing cybersecurity workshop by @AfricaHackon. Learned so much today!",
      profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      username: "Sarah Miller",
      handle: "sarahmiller",
      content: "Excited to apply for the upcoming hackathon. Who else is joining? #CyberHack #AfricaHackon",
      profilePic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      username: "James Wilson",
      handle: "jameswilson",
      content: "Just attended an amazing cybersecurity workshop by @AfricaHackon. Learned so much today!",
      profilePic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      profilePic: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pb-16">
      {/* Hero Section */}
      <section className="relative bg-black py-12 px-6 md:px-12 lg:px-16">
        <div className="container mx-auto">
          <div className="w-full max-w-[1318px] h-auto px-8 md:px-20 py-12 bg-stone-900 rounded-[30px] mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 w-full">
              <div className="w-full md:w-[55%] flex flex-col justify-start items-start gap-6 md:gap-10">
                <div className="flex flex-col justify-start items-start gap-4 md:gap-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    Africahackon Academy Happenings: Elevate Your Learning
                  </h1>
                  <p className="text-gray-300 text-base md:text-lg">
                    Explore a wealth of learning opportunities with our diverse selection of webinars, thought-provoking podcasts, and much more. Be the first to know about upcoming events with our live announcements, keeping you informed and inspired.
                  </p>
                </div>
                <div className="flex justify-start items-center gap-4 w-full">
                  <Button customVariant="primary" className="flex-1">
                    Sign Up
                  </Button>
                  <Button customVariant="secondary" className="flex-1">
                    Join Our Newsletter
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-[45%] flex justify-center items-center">
                <div className="relative w-full max-w-[400px] aspect-square">
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

      {/* Partners */}
      <section className="py-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <Image src="/images/image 5.png" alt="Business Daily" width={120} height={40} className="object-contain" />
            <Image src="/images/image 6.png" alt="TechCabal" width={120} height={40} className="object-contain" />
            <Image src="/images/image 7.png" alt="Business Insider" width={120} height={40} className="object-contain" />
            <Image src="/images/image 8.png" alt="CIO Africa" width={120} height={40} className="object-contain" />
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </div>
        </div>
      </section>

      {/* Other Updates */}
      <section className="py-12 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Other Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              {updates.map(update => (
                <div key={update.id} className="mb-6">
                  <UpdateCard 
                    title={update.title}
                    description={update.description}
                    buttonText={update.buttonText}
                    imageSrc={update.imageSrc}
                  />
                </div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="bg-[#111] rounded-lg overflow-hidden border border-[#333] p-6">
                <h3 className="text-xl font-bold text-white mb-4">X Feeds</h3>
                <div className="max-h-[500px] overflow-y-auto pr-2">
                  {tweets.map(tweet => (
                    <Tweet 
                      key={tweet.id}
                      username={tweet.username}
                      handle={tweet.handle}
                      content={tweet.content}
                      profilePic={tweet.profilePic}
                    />
                  ))}
                </div>
                <Button customVariant="secondary" className="text-[#E7343A] w-full mt-4">
                  View More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />    
    </>
  );
}
