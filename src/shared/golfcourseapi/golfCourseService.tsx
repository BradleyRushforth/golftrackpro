import axios from 'axios';

const API_URL = 'https://api.golfcourseapi.com/v1/courses';
const API_KEY = 'Key C4R4UF2N5PELS4N4KFC3YGEHMM';

export const fetchGolfCourses = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': API_KEY,
      },
    });
    console.log(response.data)
    return response.data.courses;
  } catch (error) {
    console.error('Error fetching golf courses:', error);
    throw error;
  }
};
