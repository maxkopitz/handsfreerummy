# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

WORKDIR /code

COPY ./ /code
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -e .

CMD ["python3", "-m", "flask", "--app", "handsfree", "--debug", "run", "--host", "0.0.0.0", "--port", "4000"]

FROM builder as dev-envs

RUN <<EOF
apk update
apk add git bash
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["python3", "-m", "flask", "--app", "handsfree", "--debug", "run", "--host", "0.0.0.0", "--port", "4000"]
