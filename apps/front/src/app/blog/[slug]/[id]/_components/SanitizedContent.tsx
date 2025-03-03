type Props = {
  content: string;
  className?: string;
};

export default function SanitizedContent(props: Props) {
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></div>
  );
}
