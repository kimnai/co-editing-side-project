FROM golang:1.18-alpine

WORKDIR /app

#COPY ./go.mod ./
#COPY ./go.sum ./
COPY ./ ./

RUN go mod download

RUN echo $(ls)
COPY *.go ./
RUN go build -o /server

EXPOSE 8080

CMD [ "/server" ]

