package org.example.homechoretrackerapi.chores.dto;

public enum ChoreIncrementType {
    INCREMENT, DECREMENT;

    public static ChoreIncrementType from(int value) {
        return value > 0 ? ChoreIncrementType.INCREMENT : ChoreIncrementType.DECREMENT;
    }

    public int getValue() {
        return this == INCREMENT ? 1 : -1;
    }
}
