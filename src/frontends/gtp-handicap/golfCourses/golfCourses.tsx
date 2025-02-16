import React, { useEffect, useState } from 'react';
import { fetchGolfCourses } from '../../../shared/golfcourseapi/golfCourseService';
import { IGolfCourse, ITee } from '../../../shared/golfcourseapi/interfaces';

export const GolfCourses: React.FC = () => {
  const [golfCourses, setGolfCourses] = useState<IGolfCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGolfCourses = async () => {
      try {
        const data = await fetchGolfCourses();
        setGolfCourses(data);
      } catch (error) {
        setError('Failed to load golf courses.');
      } finally {
        setLoading(false);
      }
    };

    getGolfCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Golf Courses</h1>
      <ul>
        {golfCourses.map((course) => (
          <li key={course.id}>
            <h2>{course.course_name}</h2>
            <h3>Location: {course.location.address}</h3>

            {/* Female Tees */}
            <div>
              <h4>Female Tees</h4>
              {course.tees.female?.map((tee: ITee, index) => (
                <div key={index}>
                  <p>Tee Color: {tee.tee_name}</p>
                  <p>Total Yardage: {tee.total_yards}</p>
                </div>
              ))}
            </div>

            {/* Male Tees */}
            <div>
              <h4>Male Tees</h4>
              {course.tees.male?.map((tee: ITee, index) => (
                <div key={index}>
                  <p>Tee Color: {tee.tee_name}</p>
                  <p>Total Yardage: {tee.total_yards}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
