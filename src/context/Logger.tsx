import React from 'react';

type LoggerProps = {
    logMessage?: string;
};

function withLogger<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    logMessage: string = 'Component rendered'
) {
    const ComponentWithLogger: React.FC<P & LoggerProps> = (props) => {
        React.useEffect(() => {
            // You can replace this with any logging service
            console.log(logMessage, props);
        }, [logMessage, props]);

        return <WrappedComponent {...props as P} />;
    };

    return ComponentWithLogger;
}

export default withLogger;