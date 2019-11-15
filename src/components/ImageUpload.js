import React from "react";
import Dropzone from "react-dropzone";

class ImageUpload extends React.Component {
  state = { warningMsg: "" };

  onDrop = (accepted, rejected) => {
    if (Object.keys(rejected).length !== 0) {
      const message = "Proszę przesłać plik o dobrym rozszerzeniu";
      this.setState({ warningMsg: message });
    } else {
      this.props.addFile(accepted);
      this.setState({ warningMsg: "" });

      var blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(accepted[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then(value => {
        // console.log(value);
      });
    }
  };

  render() {
    const { files } = this.props;
    const thumbsContainer = {
      width: "100%",
      height: "100%",
      maxHeight: "18vh",
      objectFit: "scale-down",
      objectPosition: "center"
    };

    const thumbs = files.map(file => (
      <img
        id="importedImage"
        key="key"
        style={thumbsContainer}
        src={file.preview}
        alt="profile"
      />
    ));

    const render =
      Object.keys(files).length !== 0 ? (
        files.map(file => <aside key="keyy">{thumbs}</aside>)
      ) : (
        <p className="hello">Kliknij lub przeciągnij tu zdjęcie</p>
      );

    return (
      <div>
        <p>{this.state.warningMsg}</p>

        <Dropzone
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            border: "1px dashed"
          }}
          multiple={false}
          accept=".jpg,.jpeg,.png"
          onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
        >
          {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
            // for drag and drop warning statement
            if (isDragReject)
              return "Proszę przesłać plik o dobrym rozszerzeniu";
            return render;
          }}
        </Dropzone>
      </div>
    );
  }
}

export default ImageUpload;
