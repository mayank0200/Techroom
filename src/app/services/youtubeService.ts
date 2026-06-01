import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeCourse {
  id: string;
  title: string;
  channel: string;
  duration: string;
  rating: number;
  students: number;
  category: string;
  thumb: string;
  videoId: string;
  description: string;
  outcomes: string[];
  level: string;
  free: boolean;
}

const MOCK_COURSES: YouTubeCourse[] = [
  {
    id: '1',
    title: 'Python Full Course for Beginners',
    channel: 'Apna College',
    duration: '12 hrs',
    rating: 4.9,
    students: 45200,
    category: 'Python',
    thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop&auto=format',
    videoId: 'vLnPwxZdW4Y', // C++ by Apna College (example)
    description: 'Learn programming in this full course for beginners. Featuring Shradha Khapra.',
    outcomes: ['Variables, data types, control flow', 'Functions & OOP', 'File I/O & modules', 'Web scraping basics'],
    level: 'Beginner',
    free: true,
  },
  {
    id: '2',
    title: 'Machine Learning Course — Full Tutorial',
    channel: 'CodeWithHarry',
    duration: '20 hrs',
    rating: 4.9,
    students: 62100,
    category: 'AI/ML',
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=340&fit=crop&auto=format',
    videoId: 'GwIo3gDZCVQ',
    description: 'In this machine learning series, we cover all major ML topics in Hindi.',
    outcomes: ['Supervised & unsupervised learning', 'Scikit-learn pipeline', 'Model evaluation metrics', 'Feature engineering'],
    level: 'Intermediate',
    free: true,
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    channel: 'Apna College',
    duration: '40 hrs',
    rating: 4.9,
    students: 120000,
    category: 'DSA',
    thumb: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=340&fit=crop&auto=format',
    videoId: 'AT14lCXuMKI',
    description: 'Complete DSA course by Shradha Khapra. Ace your product based company interviews.',
    outcomes: ['Arrays, stacks, queues', 'Trees & graphs', 'Dynamic programming', 'Interview problem solving'],
    level: 'Advanced',
    free: true,
  },
  {
    id: '4',
    title: 'React.js Full Course',
    channel: 'CodeWithHarry',
    duration: '10 hrs',
    rating: 4.8,
    students: 85000,
    category: 'React',
    thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop&auto=format',
    videoId: '-mJFZp84TIY',
    description: 'React JS in Hindi - Learn React from scratch in one video.',
    outcomes: ['Functional components & hooks', 'State & context API', 'React Router', 'Project building'],
    level: 'Intermediate',
    free: true,
  }
];

export async function searchYouTubeCourses(query: string, category: string): Promise<YouTubeCourse[]> {
  if (!API_KEY || API_KEY === 'mock_api_key') {
    // Return mock data filtered by query and category
    return MOCK_COURSES.filter(c => {
      const matchCat = category === 'All' || c.category === category;
      const matchSearch = c.title.toLowerCase().includes(query.toLowerCase()) || 
                          c.channel.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  try {
    const searchQuery = `${query} ${category !== 'All' ? category : ''} course`;
    
    // We would make a real API call here
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        videoDuration: 'long', // Fetch long courses
        maxResults: 10,
        key: API_KEY,
      }
    });

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      duration: 'Varies',
      rating: 4.5, // Mocked rating since YT API doesn't provide rating easily
      students: Math.floor(Math.random() * 50000) + 10000,
      category: category !== 'All' ? category : 'General',
      thumb: item.snippet.thumbnails.high.url,
      videoId: item.id.videoId,
      description: item.snippet.description,
      outcomes: ['Learn ' + category],
      level: 'Beginner',
      free: true,
    }));
  } catch (error) {
    console.error("YouTube API Error, falling back to mock", error);
    return MOCK_COURSES;
  }
}
