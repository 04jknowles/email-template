import React from "react";
import {
  render,
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlImage,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlButton
} from "mjml-react";

const MjmlRenderer = ({ mode = "mobile", template, items }) => {
  const title = items.filter((i) => i.name === "Title")[0].value;
  const body = items.filter((i) => i.name === "Body")[0].value;
  const cta = items.filter((i) => i.name === "CTA")[0].value;
  const ctaLink = items.filter((i) => i.name === "CTA")[0].link;
  const imageSrc = items.filter((i) => i.name === "Image")[0].value;
  const titleMarkup = (
    <MjmlSection>
      <MjmlColumn>
        <MjmlText
          fontFamily="Helvetica Neue"
          fontWeight="600"
          fontSize="18px"
          align="center"
        >
          {title}
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
  const bodyMarkup = (
    <MjmlText fontFamily="Helvetica Neue">
      <p>{body}</p>
    </MjmlText>
  );
  const button = (
    <MjmlButton padding="20px" backgroundColor="#346DB7" href={ctaLink}>
      {cta}
    </MjmlButton>
  );
  const imageMarkup = <MjmlImage src={imageSrc} />;
  const getMarkup = (order) => {
    const item = items
      .filter((i, index) => index === order)[0]
      .name.toLowerCase();
    return item === "image"
      ? imageMarkup
      : item === "cta"
      ? button
      : item === "body"
      ? bodyMarkup
      : titleMarkup;
  };

  const { html } = render(
    <Mjml>
      <MjmlHead>
        <MjmlTitle>{title}</MjmlTitle>
        <MjmlPreview>{template.preview}</MjmlPreview>
      </MjmlHead>
      <MjmlBody>
        {getMarkup(0)}
        <MjmlSection>
          <MjmlColumn>
            {getMarkup(1)}
            {getMarkup(2)}
          </MjmlColumn>
          <MjmlColumn>{getMarkup(3)}</MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );

  const mobileProps = { width: 375, height: 812 };
  const pcProps = { width: "100%", height: 768 };

  return (
    <iframe
      title="mjml-demo"
      frameBorder="none"
      srcDoc={html}
      style={{
        border: "1px solid #eeeeee",
        borderRadius: "10px"
      }}
      {...(mode === "mobile" ? mobileProps : pcProps)}
    ></iframe>
  );
};

export default MjmlRenderer;
