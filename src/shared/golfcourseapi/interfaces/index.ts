export interface IHole {
  par: number;
  yardage: number;
  handicap: number;
}

export interface ILocation {
  address: string;
  city: string;
  country: string;
  state: string;
}

export interface ITee {
  tee_name: string;
  course_rating: number;
  slope_rating: number;
  bogey_rating: number;
  total_yards: number;
  total_meters: number;
  front_bogey_rating: number;
  front_course_rating: number;
  front_slope_rating: number;
  back_bogey_rating: number;
  back_course_rating: number;
  back_slope_rating: number;
  holes: IHole[];
  number_of_holes: number;
  par_total: number;
}

export interface IGolfCourse {
  id: number;
  club_name: string;
  course_name: string;
  location: ILocation;
  tees: {
    female: ITee[];
    male: ITee[];
  };
  holes: IHole[];
}
