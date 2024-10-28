package org.example.homechoretrackerapi.chores.dto;

import java.util.Map;

public class ChoreDetails {
    private Long id;
    private String name;
    private Map<Long, Integer> values;

    public ChoreDetails() {
    }

    public ChoreDetails(Long id, String name, Map<Long, Integer> values) {
        this.id = id;
        this.name = name;
        this.values = values;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<Long, Integer> getValues() {
        return values;
    }

    public void setValues(Map<Long, Integer> values) {
        this.values = values;
    }
}
