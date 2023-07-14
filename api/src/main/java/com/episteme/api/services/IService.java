package com.episteme.api.services;

import java.util.List;

public interface IService<Entity,Id> {
    public boolean save(Entity entity);
    public boolean update(Entity entity);
    public boolean delete(Id id);
    public List<Entity> findAll();
    public Entity findById(Id id);
}
