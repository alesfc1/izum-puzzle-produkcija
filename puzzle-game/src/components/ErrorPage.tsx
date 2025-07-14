type ErrorPageProps = {
    status: number;
    message: string;
};

export default function ErrorPage({ status, message }: ErrorPageProps) {
    return (
        <div className="loading flex flex-col items-center justify-center">
            <h1 className="text-5xl text-red-700">{status}</h1>
            <p className="text-lg mt-3">{message}</p>          
        </div>
    );
    }