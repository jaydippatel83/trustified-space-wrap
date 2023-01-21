import { useRoutes } from "react-router-dom"; 
import Landing from "./components/landing/Landing";
import LendingPageLayout from "./components/landing/LendingPageLayout"; 

export default function Router() {
    return useRoutes([ 
        {
            path: "/",
            element: <LendingPageLayout />,
            children: [
                { path: "/", element: <Landing /> },
            ],
        }, 
    ]);
}
