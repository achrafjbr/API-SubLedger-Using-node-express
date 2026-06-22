const errorMessage = (statusCode, message) => {
  return {
    statusCode,
    message,
  };
};

class Message {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

class ErrorMessage extends Message {
  constructor(statusCode, message) {
    super(statusCode, message);
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

class SuccessMessage extends Message {
  constructor(statusCode, message, data) {
    super(statusCode, message);
    this.data = data;
  }

  build() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}

class DIMessage {
    constructor(){}

  message(messageClass) {
        return messageClass.build();
    }

    text(){}

}

module.exports = {
  errorMessage,
  DIMessage,
  ErrorMessage,
  SuccessMessage,
  Message,
};
