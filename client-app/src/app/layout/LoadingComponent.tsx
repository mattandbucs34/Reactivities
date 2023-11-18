import { Dimmer, Loader } from 'semantic-ui-react';

type LoadingComponentType = {
  inverted?: boolean;
  content: string;
}

const LoadingComponent = ({ content, inverted }: LoadingComponentType) => {
  return (
    <Dimmer active={true} inverted={inverted} >
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;