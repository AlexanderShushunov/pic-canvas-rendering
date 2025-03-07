import { FC, useContext } from "react";
import { FPSContext } from "./FPSContext.tsx";

import "./FPS.css";

export const FPS: FC = () => {
    const { fps } = useContext(FPSContext);
    return (
        <div className="FPS">
            {fps.toFixed(0)} FPS
        </div>
    );
};
