import { useJson } from "../sistemContextManagement/useContexts";

const SystemInfo = () => {
  const { systemInfo, isLoading } = useJson();

  return (
    <section>
      {isLoading ? (
        <div> Loading ..</div>
      ) : (
        <div>
          {Object.entries(systemInfo).map(([key, value]) => {
            return <p key={key}> {value}</p>;
          })}
        </div>
      )}
      ;
    </section>
  );
};

export default SystemInfo;
