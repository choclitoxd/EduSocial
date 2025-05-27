package com.Uniquindio.redsocialeducativa.model;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class Mensaje {
    private int id;
    private String senderId;
    private String text;
    private String time;
    @JsonProperty("isOwn")
    private boolean isOwn;

    public Mensaje(int id, String senderId, String text, boolean isOwn, String time) {
        this.id = id;
        this.senderId = senderId;
        this.text = text;
        this.isOwn = isOwn;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isOwn() {
        return isOwn;
    }

    public void setOwn(boolean own) {
        isOwn = own;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
