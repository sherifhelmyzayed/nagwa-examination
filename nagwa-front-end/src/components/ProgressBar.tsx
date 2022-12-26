
const ProgressBar = (props: any) => {
    const progressPercentage = props.index / props.total * 100
    return (
        <>
            <h2>Progress is {progressPercentage}%</h2>
            <div className='h-1 w-full bg-gray-300 transition-all'>
                <div
                    style={{ width: `${progressPercentage}%` }}
                    className={`h-full ${progressPercentage < 70 ? 'bg-red-600' : 'bg-green-600'}`}>
                </div>
            </div>
        </>
    );
};

export default ProgressBar


