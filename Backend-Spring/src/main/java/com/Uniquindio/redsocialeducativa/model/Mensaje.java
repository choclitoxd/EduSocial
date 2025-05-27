package com.Uniquindio.redsocialeducativa.model;
import java.time.LocalDateTime;

public class Mensaje {
    private String id;
    private String senderId; // puede ser "me", "1", etc.
    private String receptorId;
    private String text;
    private LocalDateTime time;

    public Mensaje(String id, String senderId, String receptorId, String text) {
        this.id = id;
        this.senderId = senderId;
        this.receptorId = receptorId;
        this.text = text;
        this.time = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public String getReceptorId() {
        return receptorId;
    }

    public void setId(String id) {
        this.id = id;
    }
}
