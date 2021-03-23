turnConfig = {
    iceServers: [{
        urls: [ "stun:bn-turn1.xirsys.com" ]
     }, {
        username: "-QDzDEwfB1RRc6aKGw4NdpMi_li8UDbBRK33r1FJnSXML5c7HYQ9SXA1GbvCIpieAAAAAGBZ6o9qYWlucmlzaGFiaA==",
        credential: "35397d70-8bda-11eb-bb8a-0242ac140004",
        urls: [
            "turn:bn-turn1.xirsys.com:80?transport=udp",
            "turn:bn-turn1.xirsys.com:3478?transport=udp",
            "turn:bn-turn1.xirsys.com:80?transport=tcp",
            "turn:bn-turn1.xirsys.com:3478?transport=tcp",
            "turns:bn-turn1.xirsys.com:443?transport=tcp",
            "turns:bn-turn1.xirsys.com:5349?transport=tcp"
        ]
     }]
}

