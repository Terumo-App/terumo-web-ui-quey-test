docker build -t terumo-web-ui-quey-test .

docker tag terumo-web-ui-quey-test terumoapp/terumo-web-ui-quey-test:latest
docker push terumoapp/terumo-web-ui-quey-test