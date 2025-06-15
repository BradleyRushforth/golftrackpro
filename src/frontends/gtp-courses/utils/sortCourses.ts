type Course = {
  name: string;
  datePlayed: string;
  total: number;
  [key: string]: any;
};

export function sortCourses(courses: Course[], filter: string): Course[] {
  return [...courses].sort((a, b) => {
    switch (filter) {
      case "alpha":
        return a.name.localeCompare(b.name);
      case "recent":
        return (
          new Date(b.datePlayed).getTime() - new Date(a.datePlayed).getTime()
        );
      case "lowest":
        return a.total - b.total;
      case "highest":
        return b.total - a.total;
      default:
        return 0;
    }
  });
}
