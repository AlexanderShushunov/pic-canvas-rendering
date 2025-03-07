import { FC, useContext } from "react";
import { FPSContext } from "./FPSContext.tsx";

import "./FPS.css";

export const FPS: FC = () => {
    const { fps, avg } = useContext(FPSContext);
    return (
        <div className="FPS">
            <div className="current">
                {fps.toFixed(0)} FPS
            </div>
            <div className="avg">
                AVG: {avg.toFixed(0)}
            </div>
        </div>

    );
};
