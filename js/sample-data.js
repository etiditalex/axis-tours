// Sample data for populating Firestore database
// This file contains sample data for hotels, tours, safaris, experiences, and transfers

export const sampleData = {
  hotels: [
    {
      name: "Serena Beach Resort & Spa",
      location: "Mombasa",
      description: "Luxury beachfront resort with world-class amenities and stunning ocean views.",
      price: 250,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      amenities: ["Pool", "Spa", "Restaurant", "Beach Access", "WiFi"],
      availability: true
    },
    {
      name: "Sarova Whitesands Beach Resort",
      location: "Mombasa",
      description: "Family-friendly resort with multiple pools and direct beach access.",
      price: 180,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      amenities: ["Pool", "Kids Club", "Restaurant", "Beach Access", "WiFi"],
      availability: true
    },
    {
      name: "Voyager Beach Resort",
      location: "Mombasa",
      description: "All-inclusive beach resort with water sports and entertainment.",
      price: 220,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      amenities: ["Pool", "Water Sports", "Restaurant", "Beach Access", "Entertainment"],
      availability: true
    },
    {
      name: "Hemingways Nairobi",
      location: "Nairobi",
      description: "Boutique hotel in the heart of Nairobi with colonial charm.",
      price: 300,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      amenities: ["Restaurant", "Bar", "WiFi", "Concierge", "Airport Shuttle"],
      availability: true
    },
    {
      name: "Fairmont The Norfolk",
      location: "Nairobi",
      description: "Historic luxury hotel with modern amenities and excellent service.",
      price: 280,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      amenities: ["Pool", "Spa", "Restaurant", "Bar", "WiFi", "Concierge"],
      availability: true
    }
  ],
  
  tours: [
    {
      name: "Nairobi City Tour",
      destination: "Nairobi",
      description: "Explore the vibrant capital city with visits to museums, markets, and cultural sites.",
      price: 80,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Full Day",
      rating: 4.5,
      includes: ["Transport", "Guide", "Lunch", "Entrance Fees"],
      availability: true
    },
    {
      name: "Mombasa Old Town Walking Tour",
      destination: "Mombasa",
      description: "Discover the rich history and culture of Mombasa's historic old town.",
      price: 60,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Half Day",
      rating: 4.4,
      includes: ["Guide", "Entrance Fees", "Refreshments"],
      availability: true
    },
    {
      name: "Lamu Island Cultural Tour",
      destination: "Lamu",
      description: "Experience the unique Swahili culture and architecture of Lamu Island.",
      price: 150,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2 Days",
      rating: 4.8,
      includes: ["Transport", "Guide", "Accommodation", "Meals"],
      availability: true
    },
    {
      name: "Mount Kenya Hiking Adventure",
      destination: "Mount Kenya",
      description: "Challenging hiking experience to the summit of Mount Kenya with stunning views.",
      price: 400,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "5 Days",
      rating: 4.9,
      includes: ["Guide", "Equipment", "Accommodation", "Meals", "Permits"],
      availability: true
    }
  ],
  
  safaris: [
    {
      name: "Maasai Mara 3-Day Safari",
      destination: "Maasai Mara",
      description: "Experience the Great Migration and Big Five in Kenya's most famous national park.",
      price: 800,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3 Days",
      rating: 4.9,
      includes: ["Transport", "Guide", "Accommodation", "Meals", "Park Fees"],
      availability: true
    },
    {
      name: "Amboseli Elephant Safari",
      destination: "Amboseli",
      description: "Witness elephants against the backdrop of Mount Kilimanjaro in Amboseli National Park.",
      price: 600,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2 Days",
      rating: 4.7,
      includes: ["Transport", "Guide", "Accommodation", "Meals", "Park Fees"],
      availability: true
    },
    {
      name: "Samburu Special Five Safari",
      destination: "Samburu",
      description: "Search for the unique Samburu Special Five in this beautiful northern reserve.",
      price: 700,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "3 Days",
      rating: 4.6,
      includes: ["Transport", "Guide", "Accommodation", "Meals", "Park Fees"],
      availability: true
    },
    {
      name: "Lake Nakuru Flamingo Safari",
      destination: "Lake Nakuru",
      description: "Marvel at thousands of flamingos and other bird species at Lake Nakuru.",
      price: 450,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "2 Days",
      rating: 4.5,
      includes: ["Transport", "Guide", "Accommodation", "Meals", "Park Fees"],
      availability: true
    }
  ],
  
  experiences: [
    {
      name: "Hot Air Balloon Safari",
      destination: "Maasai Mara",
      description: "Soar above the Maasai Mara in a hot air balloon for a unique wildlife viewing experience.",
      price: 450,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Half Day",
      rating: 4.9,
      includes: ["Balloon Ride", "Champagne Breakfast", "Certificate"],
      availability: true
    },
    {
      name: "Dhow Sailing Experience",
      destination: "Mombasa",
      description: "Traditional dhow sailing along the Kenyan coast with snorkeling and lunch.",
      price: 120,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Full Day",
      rating: 4.6,
      includes: ["Dhow Ride", "Snorkeling", "Lunch", "Equipment"],
      availability: true
    },
    {
      name: "Maasai Village Cultural Experience",
      destination: "Maasai Mara",
      description: "Immerse yourself in Maasai culture with traditional dances, crafts, and village life.",
      price: 80,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Half Day",
      rating: 4.4,
      includes: ["Village Tour", "Cultural Show", "Craft Workshop"],
      availability: true
    },
    {
      name: "Nairobi National Park Game Drive",
      destination: "Nairobi",
      description: "Unique game drive in the world's only national park within a capital city.",
      price: 150,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "Half Day",
      rating: 4.5,
      includes: ["Transport", "Guide", "Park Fees", "Refreshments"],
      availability: true
    }
  ],
  
  transfers: [
    {
      name: "Airport Transfer - Nairobi",
      destination: "Nairobi Airport",
      description: "Comfortable airport transfer service to and from Nairobi Jomo Kenyatta International Airport.",
      price: 50,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "1 Hour",
      rating: 4.7,
      includes: ["Airport Pickup", "Luggage Assistance", "WiFi"],
      availability: true
    },
    {
      name: "Mombasa Airport Transfer",
      destination: "Mombasa Airport",
      description: "Reliable transfer service to and from Mombasa Moi International Airport.",
      price: 40,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "45 Minutes",
      rating: 4.6,
      includes: ["Airport Pickup", "Luggage Assistance", "WiFi"],
      availability: true
    },
    {
      name: "Inter-City Transfer",
      destination: "Nairobi to Mombasa",
      description: "Comfortable inter-city transfer between Nairobi and Mombasa with scenic route options.",
      price: 120,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "6 Hours",
      rating: 4.5,
      includes: ["Transport", "Driver", "Refreshments", "WiFi"],
      availability: true
    },
    {
      name: "Safari Transfer Service",
      destination: "Various Parks",
      description: "Specialized transfer service to and from national parks and game reserves.",
      price: 200,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "4-8 Hours",
      rating: 4.8,
      includes: ["4WD Vehicle", "Driver Guide", "Refreshments", "Park Fees"],
      availability: true
    }
  ]
};

// Function to populate Firestore with sample data
export const populateFirestore = async (db) => {
  try {
    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
    for (const [serviceType, services] of Object.entries(sampleData)) {
      for (const service of services) {
        await addDoc(collection(db, serviceType), {
          ...service,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    
    console.log('Sample data populated successfully');
    return true;
  } catch (error) {
    console.error('Error populating sample data:', error);
    return false;
  }
};
