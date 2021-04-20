/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
 
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import StudentList from "components/component/student/StudentList";
import CourseList from "components/component/course/CourseList";
import Enrol from "components/component/enrol/Enrol";

const dashboardRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    display: true
  },{
    path: "/students",
    name: "Student List",
    icon: "nc-icon nc-single-02",
    component: StudentList,
    layout: "/admin",
    display: true
  },{
    path: "/courses",
    name: "Course List",
    icon: "nc-icon nc-notes",
    component: CourseList,
    layout: "/admin",
    display: true
  },{
    path: "/students/enrol/:id",
    name: "Enrol",
    icon: "nc-icon nc-notes",
    component: Enrol,
    layout: "/admin",
    display: false
  },{
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
    display: true
  },
 
];

export default dashboardRoutes;
