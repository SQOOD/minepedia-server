[
  {
    "name": env.IMAGE_NAME,
    "image": env.IMAGE_NAME,
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 0,
        "protocol": "tcp"
      }
    ],
    "memory": 512,
    "essential": true,
    "environment": [
      {
        "name": "PORT",
        "value": "80"
      },
      {
        "name": "MINEPEDIA_APP_SECRET",
        "value": env.MINEPEDIA_APP_SECRET
      },
      {
        "name": "POSTGRESQL_URL",
        "value": env.POSTGRESQL_URL
      }
    ]
  }
]
